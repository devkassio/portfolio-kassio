import { useRef } from 'react';
import useSmartPolling from './useSmartPolling.js';

/**
 * Last.fm "Now Playing" / "Recently Played" hook.
 *
 * Usa a API pública user.getrecenttracks:
 * – Polling inteligente via useSmartPolling (jitter, backoff, visibility-aware)
 * – Detecta faixa "now playing" via atributo @attr.nowplaying
 * – Fallback para última faixa reproduzida se nenhuma ativa
 * – Zero OAuth — só precisa de API key (gratuita) + username
 * – Artwork fallback via iTunes Search API (Last.fm removeu imagens da API)
 *
 * Variáveis de ambiente:
 *   VITE_LASTFM_API_KEY  — chave de API (https://www.last.fm/api/account/create)
 *   VITE_LASTFM_USER     — nome de usuário Last.fm
 */

const API_BASE = 'https://ws.audioscrobbler.com/2.0/';
const ITUNES_API = 'https://itunes.apple.com/search';

/**
 * Tempo máximo que uma faixa permanece como "now playing" antes de ser
 * considerada pausada. A API do Last.fm não tem evento de pausa —
 * o flag nowplaying persiste após o usuário pausar. 6 min cobre
 * a maioria das faixas pop/rock (média ~3:30).
 */
const NOW_PLAYING_TIMEOUT = 6 * 60 * 1000;

/**
 * Busca artwork no iTunes Search API quando Last.fm não retorna imagem.
 * Gratuita, sem API key, retorna capa em alta qualidade.
 */
async function fetchItunesArtwork(artist, title, signal) {
  try {
    const query = encodeURIComponent(`${artist} ${title}`);
    const res = await fetch(`${ITUNES_API}?term=${query}&media=music&limit=1`, { signal });
    if (!res.ok) return null;
    const json = await res.json();
    const result = json?.results?.[0];
    if (!result?.artworkUrl100) return null;
    return result.artworkUrl100.replace('100x100bb', '300x300bb');
  } catch {
    return null;
  }
}

function mapTrack(track) {
  if (!track) return null;

  const images = track.image || [];
  const artworkUrl =
    images.find((img) => img.size === 'extralarge')?.['#text'] ||
    images.find((img) => img.size === 'large')?.['#text'] ||
    '';

  return {
    title: track.name || 'Faixa desconhecida',
    artist: track.artist?.['#text'] || track.artist?.name || 'Artista desconhecido',
    album: track.album?.['#text'] || '',
    artworkUrl: artworkUrl || null,
    url: track.url || null,
    isNowPlaying: track['@attr']?.nowplaying === 'true',
  };
}

export default function useLastFm({ apiKey, username, enabled = true }) {
  const hasConfig = !!(apiKey && username);
  const npRef = useRef({ key: null, since: 0 });

  const { data, updatedAt, latency, error, isStale } = useSmartPolling({
    key: `live:lastfm:${username || 'none'}`,
    fetcher: async (signal) => {
      const url = `${API_BASE}?method=user.getrecenttracks&user=${encodeURIComponent(username)}&api_key=${apiKey}&format=json&limit=1`;
      const res = await fetch(url, { signal });
      if (!res.ok) throw new Error(`Last.fm: ${res.status}`);
      const json = await res.json();

      const tracks = json?.recenttracks?.track;
      if (!tracks || !tracks.length) return null;

      const track = Array.isArray(tracks) ? tracks[0] : tracks;
      const mapped = mapTrack(track);

      /* Fallback: se Last.fm não retornou artwork, busca no iTunes */
      if (mapped && !mapped.artworkUrl) {
        mapped.artworkUrl = await fetchItunesArtwork(mapped.artist, mapped.title, signal);
      }

      return mapped;
    },
    interval: 15_000,
    staleAfter: 120_000,
    enabled: enabled && hasConfig,
  });

  /* Heurística de pausa: se a mesma faixa está "now playing" por mais de
     6 min, provavelmente o usuário pausou. Last.fm não envia evento de pausa,
     então usamos timeout baseado na duração típica de uma faixa. */
  let track = data;
  if (data?.isNowPlaying) {
    const trackKey = `${data.title}::${data.artist}`;
    if (npRef.current.key !== trackKey) {
      npRef.current = { key: trackKey, since: Date.now() };
    }
    if (Date.now() - npRef.current.since > NOW_PLAYING_TIMEOUT) {
      track = { ...data, isNowPlaying: false };
    }
  } else {
    npRef.current = { key: null, since: 0 };
  }

  return {
    track,
    updatedAt,
    latency,
    error,
    isStale,
    isConfigured: hasConfig,
  };
}
