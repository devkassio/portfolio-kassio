import { useRef } from 'react';
import useSmartPolling from './useSmartPolling.js';

/** Chave no localStorage para persistir cache de artwork entre sessões. */
const ARTWORK_CACHE_KEY = 'live:artwork-cache';

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

/** Timeout dedicado para busca de artwork (ms). */
const ARTWORK_FETCH_TIMEOUT = 5_000;

/**
 * Cache de artwork com persistência em localStorage.
 * Evita re-fetch a cada poll (15s) E entre sessões/reloads.
 * Chave: "artist::title" → URL ou null.
 */
const artworkCache = new Map();

/* Hidratar cache a partir do localStorage */
try {
  const stored = localStorage.getItem(ARTWORK_CACHE_KEY);
  if (stored) {
    for (const [k, v] of JSON.parse(stored)) artworkCache.set(k, v);
  }
} catch {
  /* ignore */
}

function persistArtworkCache() {
  try {
    /* Limita a 50 entradas mais recentes */
    const entries = [...artworkCache.entries()].slice(-50);
    localStorage.setItem(ARTWORK_CACHE_KEY, JSON.stringify(entries));
  } catch {
    /* quota exceeded */
  }
}

/**
 * Busca uma query no iTunes Search e retorna URL da capa em 600x600.
 * Usa AbortController próprio com timeout de 5s — desacoplado do polling.
 */
async function queryItunes(searchTerm) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ARTWORK_FETCH_TIMEOUT);
  try {
    const q = encodeURIComponent(searchTerm);
    const res = await fetch(`${ITUNES_API}?term=${q}&media=music&limit=1`, {
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const json = await res.json();
    const hit = json?.results?.[0];
    if (!hit?.artworkUrl100) return null;
    /* 600x600 → nítido em retina 3x (imagem renderizada a 80×80 CSS) */
    return hit.artworkUrl100.replace('100x100bb', '600x600bb');
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Busca artwork com cache + múltiplas estratégias de busca.
 *
 * 1. Retorna do cache instantaneamente se já buscou antes.
 * 2. Tenta "artist title" (mais específico).
 * 3. Se falhar e houver álbum, tenta "artist album" (funciona melhor
 *    para faixas com nomes genéricos).
 *
 * O null também é cacheado para evitar re-tentativas infinitas em faixas
 * sem resultado no iTunes.
 */
async function fetchArtwork(artist, title, album) {
  const cacheKey = `${artist}::${title}`;
  if (artworkCache.has(cacheKey)) return artworkCache.get(cacheKey);

  let url = await queryItunes(`${artist} ${title}`);

  if (!url && album) {
    url = await queryItunes(`${artist} ${album}`);
  }

  artworkCache.set(cacheKey, url);
  persistArtworkCache();
  return url;
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
  const lastNpTrackRef = useRef(null);

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

      /* Fallback: Last.fm removeu imagens da API — busca no iTunes com cache */
      if (mapped && !mapped.artworkUrl) {
        mapped.artworkUrl = await fetchArtwork(mapped.artist, mapped.title, mapped.album);
      }

      return mapped;
    },
    interval: 15_000,
    staleAfter: 120_000,
    enabled: enabled && hasConfig,
  });

  /*
   * Lógica de estado da faixa:
   *
   * 1. Se a faixa está "now playing" → cacheia e mostra normalmente.
   *    Se >6 min com mesma faixa, trata como pausada (Last.fm não envia pause).
   *
   * 2. Se NÃO está "now playing" → mostra a última faixa cacheada (que o
   *    usuário realmente estava ouvindo), não o scrobble antigo que a API
   *    retorna (pode ser de dias atrás).
   */
  let track = data;

  if (data?.isNowPlaying) {
    const trackKey = `${data.title}::${data.artist}`;

    if (npRef.current.key !== trackKey) {
      npRef.current = { key: trackKey, since: Date.now() };
    }

    /* Timeout: mesma faixa "tocando" por >6 min → provavelmente pausou */
    if (Date.now() - npRef.current.since > NOW_PLAYING_TIMEOUT) {
      track = { ...data, isNowPlaying: false };
    }

    /* Cacheia a faixa atual para usar quando o status mudar */
    lastNpTrackRef.current = track;
  } else if (lastNpTrackRef.current) {
    /* Não está tocando: mostra a última faixa real, não o scrobble antigo */
    track = { ...lastNpTrackRef.current, isNowPlaying: false };
    npRef.current = { key: null, since: 0 };
  }

  /*
   * Estabilizar referência: só emite novo objeto quando o conteúdo real
   * muda (título, artista, artwork, isNowPlaying). Evita re-renders
   * desnecessários a cada ciclo de poll (15s) que causavam flash na <img>.
   */
  const stableRef = useRef(null);
  const prev = stableRef.current;
  if (
    !prev ||
    prev.title !== track?.title ||
    prev.artist !== track?.artist ||
    prev.artworkUrl !== track?.artworkUrl ||
    prev.isNowPlaying !== track?.isNowPlaying
  ) {
    stableRef.current = track;
  }

  return {
    track: stableRef.current,
    updatedAt,
    latency,
    error,
    isStale,
    isConfigured: hasConfig,
  };
}
