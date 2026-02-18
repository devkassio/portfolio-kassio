import { useCallback } from 'react';
import useSmartPolling from './useSmartPolling.js';

/**
 * Estimates recent GitHub contributions by counting push events.
 *
 * Uses /users/:username/events/public (no auth, max 300 events / 90 days).
 * Sums commit counts from PushEvent payloads for a reasonable approximation.
 * Falls back to a provided fallback value if the API fails or returns zero.
 *
 * Polls every 5 minutes — lightweight and within rate limits.
 */
export default function useGithubContributions({ username, fallback = 0, enabled = true }) {
  const fetcher = useCallback(
    async (signal) => {
      const pages = [1, 2, 3];
      const results = await Promise.all(
        pages.map((page) =>
          fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=100&page=${page}`,
            {
              signal,
              headers: { Accept: 'application/vnd.github.v3+json' },
            }
          ).then((res) => (res.ok ? res.json() : []))
        )
      );

      const events = results.flat();
      let commits = 0;

      for (const evt of events) {
        if (evt.type === 'PushEvent' && evt.payload?.commits) {
          commits += evt.payload.commits.length;
        }
      }

      return commits > 0 ? commits : null;
    },
    [username]
  );

  const { data } = useSmartPolling({
    key: `live:github-contributions:${username || 'none'}`,
    fetcher,
    interval: 300_000,
    staleAfter: 600_000,
    enabled: enabled && !!username,
  });

  return data ?? fallback;
}
