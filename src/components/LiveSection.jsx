import { memo, useEffect, useState } from 'react';
import {
  PiArrowSquareOutBold,
  PiCircleFill,
  PiClockBold,
  PiGitCommitBold,
  PiHeartbeatBold,
  PiLinkBold,
  PiMusicNoteFill,
  PiPauseFill,
  PiPlayFill,
  PiPulseBold,
  PiWarningBold,
} from 'react-icons/pi';
import { SiGithub, SiLastdotfm } from 'react-icons/si';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import useLastFm from '../hooks/useLastFm.js';
import SectionHeader from './SectionHeader.jsx';

/* ── helpers ────────────────────────────────────────────── */

function timeAgo(dateStr, lang) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return lang === 'en' ? 'now' : 'agora';
  const mins = Math.floor(secs / 60);
  if (mins < 60) return lang === 'en' ? `${mins} min ago` : `há ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return lang === 'en' ? `${hours}h ago` : `há ${hours}h`;
  const days = Math.floor(hours / 24);
  return lang === 'en' ? `${days}d ago` : `há ${days}d`;
}

function timestampAgo(ts, lang) {
  if (!ts) return '';
  const diff = Date.now() - ts;
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return lang === 'en' ? 'now' : 'agora';
  const mins = Math.floor(secs / 60);
  if (mins < 60) return lang === 'en' ? `${mins} min ago` : `há ${mins} min`;
  const hours = Math.floor(mins / 60);
  return lang === 'en' ? `${hours}h ago` : `há ${hours}h`;
}

/* ── CARD A — Last.fm / Now Playing ─────────────────────── */

function LastFmCard({ lastfm }) {
  const { track, error, isStale, isConfigured } = lastfm;
  const { t } = useLanguage();

  /* Não configurado — mostra placeholder */
  if (!isConfigured) {
    return (
      <div className="live-card live-card--music">
        <div className="live-card-header">
          <SiLastdotfm className="live-card-icon live-card-icon--music" aria-hidden="true" />
          <h3 className="live-card-title">{t('Now Playing')}</h3>
        </div>
        <div className="live-card-body live-card-body--empty">
          <PiMusicNoteFill className="live-empty-icon" aria-hidden="true" />
          <p className="live-empty-text">{t('Scrobbling não configurado')}</p>
        </div>
      </div>
    );
  }

  /* Loading (sem dados ainda) */
  if (!track && !error) {
    return (
      <div className="live-card live-card--music">
        <div className="live-card-header">
          <SiLastdotfm className="live-card-icon live-card-icon--music" aria-hidden="true" />
          <h3 className="live-card-title">{t('Now Playing')}</h3>
        </div>
        <div className="live-card-body">
          <div className="live-skeleton live-skeleton--artwork" />
          <div className="live-skeleton live-skeleton--line" />
          <div className="live-skeleton live-skeleton--line live-skeleton--short" />
        </div>
      </div>
    );
  }

  /* Erro sem fallback */
  if (error && !track) {
    return (
      <div className="live-card live-card--music">
        <div className="live-card-header">
          <SiLastdotfm className="live-card-icon live-card-icon--music" aria-hidden="true" />
          <h3 className="live-card-title">{t('Now Playing')}</h3>
        </div>
        <div className="live-card-body live-card-body--empty">
          <PiWarningBold className="live-empty-icon" aria-hidden="true" />
          <p className="live-empty-text">{t('Não foi possível carregar')}</p>
        </div>
      </div>
    );
  }

  /* Dados disponíveis */
  const isPlaying = track.isNowPlaying;

  return (
    <div className={`live-card live-card--music${isPlaying ? ' live-card--active' : ''}`}>
      <div className="live-card-header">
        <SiLastdotfm className="live-card-icon live-card-icon--music" aria-hidden="true" />
        <h3 className="live-card-title">{isPlaying ? t('Ouvindo agora') : t('Última faixa')}</h3>
        <span
          className={`live-badge ${isPlaying ? 'live-badge--playing' : 'live-badge--connected'}${isStale ? ' live-badge--stale' : ''}`}
          aria-label={isPlaying ? t('Tocando agora') : t('Recente')}
        >
          {isPlaying ? <PiPlayFill aria-hidden="true" /> : <PiPauseFill aria-hidden="true" />}
          <span className="live-badge-text">{isPlaying ? t('Ao vivo') : t('Recente')}</span>
        </span>
      </div>
      <div className="live-card-body">
        <div className="live-music-content">
          {track.artworkUrl ? (
            <img
              className="live-music-artwork"
              src={track.artworkUrl}
              alt={`${t('Capa do álbum ')}${track.album}`}
              width="80"
              height="80"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="live-music-artwork live-music-artwork--placeholder">
              <PiMusicNoteFill aria-hidden="true" />
            </div>
          )}
          <div className="live-music-info">
            <span className="live-music-track" title={track.title}>
              {track.title}
            </span>
            <span className="live-music-artist" title={track.artist}>
              {track.artist}
            </span>
            {track.album ? (
              <span className="live-music-album" title={track.album}>
                {track.album}
              </span>
            ) : null}
          </div>
        </div>
        {track.url ? (
          <a
            className="live-lastfm-link"
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver ${track.title} no Last.fm`}
          >
            <PiArrowSquareOutBold aria-hidden="true" />
            <span>{t('Ver no Last.fm')}</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}

/* ── CARD B — GitHub Activity ──────────────────────────── */

function GithubActivityCard({ github }) {
  const { data, updatedAt, error, isStale } = github;
  const { t, lang } = useLanguage();

  return (
    <div className="live-card live-card--github">
      <div className="live-card-header">
        <SiGithub className="live-card-icon" aria-hidden="true" />
        <h3 className="live-card-title">{t('Atividade Dev')}</h3>
        {updatedAt ? (
          <span className={`live-badge${isStale ? ' live-badge--stale' : ''}`}>
            <PiClockBold aria-hidden="true" />
            <span className="live-badge-text">{timestampAgo(updatedAt, lang)}</span>
          </span>
        ) : null}
      </div>
      <div className="live-card-body">
        {!data && !error ? (
          <>
            <div className="live-skeleton live-skeleton--line" />
            <div className="live-skeleton live-skeleton--line live-skeleton--short" />
          </>
        ) : error && !data ? (
          <div className="live-card-error">
            <PiWarningBold aria-hidden="true" />
            <p>{t('Não foi possível carregar a atividade')}</p>
          </div>
        ) : data ? (
          <div className="live-github-content">
            <div className="live-github-event">
              <PiGitCommitBold className="live-github-icon" aria-hidden="true" />
              <div className="live-github-details">
                <span className="live-github-message" title={data.message}>
                  {data.message}
                </span>
                <span className="live-github-meta">
                  <span className="live-github-repo">{data.repo}</span>
                  {data.createdAt ? (
                    <span className="live-github-time">{timeAgo(data.createdAt, lang)}</span>
                  ) : null}
                </span>
              </div>
            </div>
            {data.repoUrl ? (
              <a
                className="live-github-link"
                href={data.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver repositório ${data.repo} no GitHub`}
              >
                <PiArrowSquareOutBold aria-hidden="true" />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ── CARD C — Status / Heartbeat ───────────────────────── */

function StatusCard({ github, lastfm }) {
  const { t, lang } = useLanguage();
  const [_tick, setTick] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setTick(Date.now()), 10000);
    return () => clearInterval(id);
  }, []);

  const hasPartialError = !!(github.error || (lastfm.isConfigured && lastfm.error));
  const latencyMs = github.latency;
  const lastUpdate = github.updatedAt;

  return (
    <div className="live-card live-card--status">
      <div className="live-card-header">
        <PiHeartbeatBold className="live-card-icon live-card-icon--status" aria-hidden="true" />
        <h3 className="live-card-title">{t('Status')}</h3>
        <span className={'live-badge live-badge--online'} aria-label={`${t('Status')} online`}>
          <PiCircleFill aria-hidden="true" />
          <span className="live-badge-text">{t('Online')}</span>
        </span>
      </div>
      <div className="live-card-body">
        <div className="live-status-grid">
          <div className="live-status-item">
            <PiPulseBold className="live-status-icon" aria-hidden="true" />
            <div className="live-status-info">
              <span className="live-status-label">{t('Resposta')}</span>
              <span className="live-status-value">
                {latencyMs !== null ? `~${latencyMs} ms` : '—'}
              </span>
            </div>
          </div>
          <div className="live-status-item">
            <PiClockBold className="live-status-icon" aria-hidden="true" />
            <div className="live-status-info">
              <span className="live-status-label">{t('Última atualização')}</span>
              <span className="live-status-value">
                {lastUpdate ? timestampAgo(lastUpdate, lang) : '—'}
              </span>
            </div>
          </div>
          <div className="live-status-item">
            <PiLinkBold className="live-status-icon" aria-hidden="true" />
            <div className="live-status-info">
              <span className="live-status-label">{t('Conexões')}</span>
              <span className="live-status-value">
                {hasPartialError ? t('Parcialmente indisponível') : t('Todos os serviços OK')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── LIVE SECTION ──────────────────────────────────────── */

function LiveSection({ githubActivity }) {
  const { t } = useLanguage();
  const lastfm = useLastFm({
    apiKey: import.meta.env.VITE_LASTFM_API_KEY || '',
    username: import.meta.env.VITE_LASTFM_USER || '',
  });

  return (
    <section id="live" className="section section--surface" aria-label={t('Dados ao vivo')}>
      <div className="container">
        <SectionHeader
          eyebrow="Em tempo real"
          title="Live"
          description="Painel ao vivo com dados do meu dev life — atualizado automaticamente."
        />
        <div className="live-grid">
          <LastFmCard lastfm={lastfm} />
          <GithubActivityCard github={githubActivity} />
          <StatusCard github={githubActivity} lastfm={lastfm} />
        </div>
      </div>
    </section>
  );
}

export default memo(LiveSection);
