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
  PiPlugBold,
  PiPulseBold,
  PiWarningBold,
} from 'react-icons/pi';
import { SiApplemusic, SiGithub } from 'react-icons/si';
import SectionHeader from './SectionHeader.jsx';

/* ── helpers ────────────────────────────────────────────── */

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return 'agora';
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `há ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `há ${hours}h`;
  const days = Math.floor(hours / 24);
  return `há ${days}d`;
}

function timestampAgo(ts) {
  if (!ts) return '';
  const diff = Date.now() - ts;
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return 'agora';
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `há ${mins} min`;
  const hours = Math.floor(mins / 60);
  return `há ${hours}h`;
}

/* ── CARD A — Apple Music ───────────────────────────────── */

function AppleMusicCard({ apple }) {
  const { status, nowPlaying, playbackState, progress, currentTime, connect, formatTime } = apple;

  if (status === 'idle' || status === 'unauthorized' || status === 'error') {
    return (
      <div className="live-card live-card--music">
        <div className="live-card-header">
          <SiApplemusic className="live-card-icon live-card-icon--music" aria-hidden="true" />
          <h3 className="live-card-title">Apple Music</h3>
        </div>
        <div className="live-card-body live-card-body--empty">
          <PiMusicNoteFill className="live-empty-icon" aria-hidden="true" />
          <p className="live-empty-text">
            {status === 'error'
              ? 'Apple Music indisponível no momento'
              : status === 'unauthorized'
                ? 'Autorização não concedida'
                : 'Conecte para exibir seu Now Playing'}
          </p>
          <button
            type="button"
            className="btn btn--primary btn--sm"
            onClick={connect}
            aria-label="Conectar Apple Music"
          >
            <PiPlugBold aria-hidden="true" />
            Conectar
          </button>
        </div>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="live-card live-card--music">
        <div className="live-card-header">
          <SiApplemusic className="live-card-icon live-card-icon--music" aria-hidden="true" />
          <h3 className="live-card-title">Apple Music</h3>
        </div>
        <div className="live-card-body">
          <div className="live-skeleton live-skeleton--artwork" />
          <div className="live-skeleton live-skeleton--line" />
          <div className="live-skeleton live-skeleton--line live-skeleton--short" />
        </div>
      </div>
    );
  }

  /* authorized */
  if (!nowPlaying) {
    return (
      <div className="live-card live-card--music">
        <div className="live-card-header">
          <SiApplemusic className="live-card-icon live-card-icon--music" aria-hidden="true" />
          <h3 className="live-card-title">Apple Music</h3>
          <span className="live-badge live-badge--connected">Conectado</span>
        </div>
        <div className="live-card-body live-card-body--empty">
          <PiMusicNoteFill className="live-empty-icon" aria-hidden="true" />
          <p className="live-empty-text">Nenhuma faixa tocando</p>
        </div>
      </div>
    );
  }

  const duration = nowPlaying.duration || 0;

  return (
    <div className="live-card live-card--music live-card--active">
      <div className="live-card-header">
        <SiApplemusic className="live-card-icon live-card-icon--music" aria-hidden="true" />
        <h3 className="live-card-title">Tocando agora</h3>
        <span
          className="live-badge live-badge--playing"
          aria-label={playbackState === 'playing' ? 'Tocando' : 'Pausado'}
        >
          {playbackState === 'playing' ? (
            <PiPlayFill aria-hidden="true" />
          ) : (
            <PiPauseFill aria-hidden="true" />
          )}
          <span className="live-badge-text">
            {playbackState === 'playing' ? 'Ao vivo' : 'Pausado'}
          </span>
        </span>
      </div>
      <div className="live-card-body">
        <div className="live-music-content">
          {nowPlaying.artworkUrl ? (
            <img
              className="live-music-artwork"
              src={nowPlaying.artworkUrl}
              alt={`Capa do álbum ${nowPlaying.album}`}
              width="80"
              height="80"
              loading="lazy"
            />
          ) : (
            <div className="live-music-artwork live-music-artwork--placeholder">
              <PiMusicNoteFill aria-hidden="true" />
            </div>
          )}
          <div className="live-music-info">
            <span className="live-music-track" title={nowPlaying.title}>
              {nowPlaying.title}
            </span>
            <span className="live-music-artist" title={nowPlaying.artist}>
              {nowPlaying.artist}
            </span>
            {nowPlaying.album ? (
              <span className="live-music-album" title={nowPlaying.album}>
                {nowPlaying.album}
              </span>
            ) : null}
          </div>
        </div>
        <div
          className="live-music-progress"
          role="progressbar"
          tabIndex="-1"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Progresso da faixa"
        >
          <div className="live-music-progress-bar" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="live-music-times">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

/* ── CARD B — GitHub Activity ──────────────────────────── */

function GithubActivityCard({ github }) {
  const { data, updatedAt, error, isStale } = github;

  return (
    <div className="live-card live-card--github">
      <div className="live-card-header">
        <SiGithub className="live-card-icon" aria-hidden="true" />
        <h3 className="live-card-title">Atividade Dev</h3>
        {updatedAt ? (
          <span className={`live-badge${isStale ? ' live-badge--stale' : ''}`}>
            <PiClockBold aria-hidden="true" />
            <span className="live-badge-text">{timestampAgo(updatedAt)}</span>
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
            <p>Não foi possível carregar a atividade</p>
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
                    <span className="live-github-time">{timeAgo(data.createdAt)}</span>
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

function StatusCard({ github, apple }) {
  const [_tick, setTick] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setTick(Date.now()), 10000);
    return () => clearInterval(id);
  }, []);

  const _isOnline = true; /* always — client-side */
  const hasPartialError = !!(github.error || apple.status === 'error');
  const latencyMs = github.latency;
  const lastUpdate = github.updatedAt;

  return (
    <div className="live-card live-card--status">
      <div className="live-card-header">
        <PiHeartbeatBold className="live-card-icon live-card-icon--status" aria-hidden="true" />
        <h3 className="live-card-title">Status</h3>
        <span className={'live-badge live-badge--online'} aria-label="Status online">
          <PiCircleFill aria-hidden="true" />
          <span className="live-badge-text">Online</span>
        </span>
      </div>
      <div className="live-card-body">
        <div className="live-status-grid">
          <div className="live-status-item">
            <PiPulseBold className="live-status-icon" aria-hidden="true" />
            <div className="live-status-info">
              <span className="live-status-label">Resposta</span>
              <span className="live-status-value">
                {latencyMs !== null ? `~${latencyMs} ms` : '—'}
              </span>
            </div>
          </div>
          <div className="live-status-item">
            <PiClockBold className="live-status-icon" aria-hidden="true" />
            <div className="live-status-info">
              <span className="live-status-label">Última atualização</span>
              <span className="live-status-value">
                {lastUpdate ? timestampAgo(lastUpdate) : '—'}
              </span>
            </div>
          </div>
          <div className="live-status-item">
            <PiLinkBold className="live-status-icon" aria-hidden="true" />
            <div className="live-status-info">
              <span className="live-status-label">Conexões</span>
              <span className="live-status-value">
                {hasPartialError ? 'Parcialmente indisponível' : 'Todos os serviços OK'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── LIVE SECTION ──────────────────────────────────────── */

function LiveSection({ githubActivity, appleMusic }) {
  return (
    <section id="live" className="section section--surface" aria-label="Dados ao vivo">
      <div className="container">
        <SectionHeader
          eyebrow="Em tempo real"
          title="Live"
          description="Painel ao vivo com dados do meu dev life — atualizado automaticamente."
        />
        <div className="live-grid">
          <AppleMusicCard apple={appleMusic} />
          <GithubActivityCard github={githubActivity} />
          <StatusCard github={githubActivity} apple={appleMusic} />
        </div>
      </div>
    </section>
  );
}

export default memo(LiveSection);
