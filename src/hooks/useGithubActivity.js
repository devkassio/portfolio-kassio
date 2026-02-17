import { useCallback } from 'react';
import useSmartPolling from './useSmartPolling.js';

/**
 * Fetches the latest public GitHub event for a user.
 * Uses the /users/:user/events/public endpoint — no auth needed.
 * Returns the most recent push event (or any event) with:
 *   repo, message, type, url, createdAt
 */

function mapEvent(evt) {
  if (!evt) return null;

  const repo = evt.repo ? evt.repo.name : '';
  const repoUrl = repo ? `https://github.com/${repo}` : '';
  const type = evt.type || '';
  const createdAt = evt.created_at || '';
  let message = '';

  if (type === 'PushEvent' && evt.payload?.commits?.length) {
    const commit = evt.payload.commits[evt.payload.commits.length - 1];
    message = commit.message.split('\n')[0];
  } else if (type === 'CreateEvent') {
    message = `Criou ${evt.payload?.ref_type || 'recurso'}${evt.payload?.ref ? ` ${evt.payload.ref}` : ''}`;
  } else if (type === 'PullRequestEvent') {
    message = `${evt.payload?.action || ''} PR #${evt.payload?.pull_request?.number || ''}`;
  } else if (type === 'IssuesEvent') {
    message = `${evt.payload?.action || ''} issue #${evt.payload?.issue?.number || ''}`;
  } else if (type === 'WatchEvent') {
    message = `Starred ${repo}`;
  } else if (type === 'ForkEvent') {
    message = `Forked ${repo}`;
  } else {
    message = type.replace('Event', '');
  }

  return { repo: repo, repoUrl: repoUrl, type: type, message: message, createdAt: createdAt };
}

export default function useGithubActivity({ username, enabled = true }) {
  const fetcher = useCallback(
    async (signal) => {
      const url = `https://api.github.com/users/${username}/events/public?per_page=10`;
      const res = await fetch(url, {
        signal: signal,
        headers: { Accept: 'application/vnd.github.v3+json' },
      });
      if (!res.ok) throw new Error(`GitHub events: ${res.status}`);
      const events = await res.json();
      /* prefer PushEvent, fallback to first event */
      const push = events.find((e) => e.type === 'PushEvent');
      return mapEvent(push || events[0] || null);
    },
    [username]
  );

  return useSmartPolling({
    key: `live:github:${username}`,
    fetcher: fetcher,
    interval: 30000,
    staleAfter: 120000,
    enabled: enabled,
  });
}
