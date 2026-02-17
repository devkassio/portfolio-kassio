import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Apple Music "Now Playing" hook using MusicKit JS v3.
 *
 * – Carrega MusicKit JS somente no primeiro clique em "Conectar"
 * – Após autorização, escuta eventos do player (playbackStateDidChange,
 *   nowPlayingItemDidChange, playbackTimeDidChange) para UI em tempo real
 * – Fallback: se MusicKit indisponível, mantém estado desconectado sem erro
 * – Nenhum segredo exposto no client — developer token deve ser passado como prop
 *   (injetado via variável de ambiente no build time)
 *
 * Status: 'idle' | 'loading' | 'authorized' | 'unauthorized' | 'error'
 */

const MUSICKIT_SRC = 'https://js-cdn.music.apple.com/musickit/v3/musickit.js';

function loadMusicKitScript() {
  return new Promise((resolve, reject) => {
    if (window.MusicKit) {
      resolve(window.MusicKit);
      return;
    }
    const existing = document.querySelector('script[src*="musickit"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.MusicKit));
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.src = MUSICKIT_SRC;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.addEventListener('load', () => resolve(window.MusicKit));
    script.addEventListener('error', () => reject(new Error('MusicKit script failed')));
    document.head.appendChild(script);
  });
}

function formatTime(seconds) {
  if (!seconds || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function mapNowPlaying(item) {
  if (!item) return null;
  const attrs = item.attributes || {};
  const artwork = attrs.artwork;
  const artworkUrl = artwork ? artwork.url.replace('{w}', '300').replace('{h}', '300') : null;

  return {
    title: attrs.name || 'Faixa desconhecida',
    artist: attrs.artistName || 'Artista desconhecido',
    album: attrs.albumName || '',
    artworkUrl: artworkUrl,
    duration: (attrs.durationInMillis || 0) / 1000,
  };
}

export default function useAppleMusic({ developerToken }) {
  const [status, setStatus] = useState('idle');
  const [nowPlaying, setNowPlaying] = useState(null);
  const [playbackState, setPlaybackState] = useState('none');
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const instanceRef = useRef(null);
  const rafRef = useRef(null);
  const mountedRef = useRef(true);

  /* Progress tracker via rAF for smooth bar */
  const trackProgress = useCallback(() => {
    const player = instanceRef.current;
    if (!player) return;
    const time = player.currentPlaybackTime || 0;
    const dur = player.currentPlaybackDuration || 0;
    if (mountedRef.current) {
      setCurrentTime(time);
      setProgress(dur > 0 ? time / dur : 0);
    }
    rafRef.current = requestAnimationFrame(trackProgress);
  }, []);

  const stopProgressTracker = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const startProgressTracker = useCallback(() => {
    stopProgressTracker();
    rafRef.current = requestAnimationFrame(trackProgress);
  }, [trackProgress, stopProgressTracker]);

  /* Connect action — called on user click */
  const connect = useCallback(async () => {
    if (!developerToken) {
      setStatus('error');
      return;
    }
    setStatus('loading');

    try {
      const MusicKit = await loadMusicKitScript();

      await MusicKit.configure({
        developerToken: developerToken,
        app: {
          name: 'Kássio Portfolio',
          build: '1.0.0',
        },
      });

      const music = MusicKit.getInstance();
      instanceRef.current = music;

      await music.authorize();
      if (!mountedRef.current) return;
      setStatus('authorized');

      /* initial state */
      const item = music.nowPlayingItem;
      setNowPlaying(mapNowPlaying(item));
      setPlaybackState(music.playbackState === 2 ? 'playing' : 'paused');
      if (music.playbackState === 2) startProgressTracker();

      /* listeners */
      music.addEventListener('playbackStateDidChange', (evt) => {
        if (!mountedRef.current) return;
        const state = evt.state;
        /* MusicKit states: 0=none, 1=loading, 2=playing, 3=paused, 4=stopped, 5=ended */
        if (state === 2) {
          setPlaybackState('playing');
          startProgressTracker();
        } else {
          setPlaybackState(state === 1 ? 'loading' : 'paused');
          stopProgressTracker();
        }
      });

      music.addEventListener('nowPlayingItemDidChange', (evt) => {
        if (!mountedRef.current) return;
        setNowPlaying(mapNowPlaying(evt.item));
        setProgress(0);
        setCurrentTime(0);
      });
    } catch (_err) {
      if (!mountedRef.current) return;
      setStatus('unauthorized');
    }
  }, [developerToken, startProgressTracker, stopProgressTracker]);

  /* Cleanup */
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      stopProgressTracker();
    };
  }, [stopProgressTracker]);

  return {
    status,
    nowPlaying,
    playbackState,
    progress,
    currentTime,
    connect,
    formatTime,
  };
}
