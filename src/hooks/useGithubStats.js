import { useCallback } from 'react';
import useSmartPolling from './useSmartPolling.js';

/**
 * Rich GitHub stats from the public Events API.
 *
 * Returns:
 *  - total:        total commit count across all PushEvents (≤300 events / 90 days)
 *  - dailyMap:     Object<"YYYY-MM-DD", commitCount> for heatmap rendering (LOCAL timezone)
 *  - streak:       consecutive days (ending today/yesterday) with ≥1 commit
 *  - lastActiveAt: ISO timestamp of most recent event (any type)
 *
 * Same 3-page parallel fetch as before — zero extra API calls.
 * Polls every 5 minutes via useSmartPolling.
 */

/** Formats a Date as "YYYY-MM-DD" in LOCAL timezone (not UTC). */
function toLocalDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function buildDailyMap(events) {
  const map = {};

  for (const evt of events) {
    if (evt.type !== 'PushEvent' || !evt.payload?.commits) continue;
    const date = new Date(evt.created_at);
    if (Number.isNaN(date.getTime())) continue;
    const day = toLocalDateKey(date);
    map[day] = (map[day] || 0) + evt.payload.commits.length;
  }

  return map;
}

function calcStreak(dailyMap) {
  const today = new Date();
  let streak = 0;

  for (let i = 0; i < 90; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = toLocalDateKey(d);

    if (dailyMap[key] && dailyMap[key] > 0) {
      streak++;
    } else if (i === 0) {
      /* today may not have commits yet — skip */
    } else {
      break;
    }
  }

  return streak;
}

export default function useGithubStats({ username, fallback = 0, enabled = true }) {
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

      let total = 0;
      for (const evt of events) {
        if (evt.type === 'PushEvent' && evt.payload?.commits) {
          total += evt.payload.commits.length;
        }
      }

      const dailyMap = buildDailyMap(events);
      const streak = calcStreak(dailyMap);
      const lastActiveAt = events[0]?.created_at || null;

      return { total: total > 0 ? total : null, dailyMap, streak, lastActiveAt };
    },
    [username]
  );

  const { data } = useSmartPolling({
    key: `live:github-stats:${username || 'none'}`,
    fetcher,
    interval: 300_000,
    staleAfter: 600_000,
    enabled: enabled && !!username,
  });

  return {
    total: data?.total ?? fallback,
    dailyMap: data?.dailyMap ?? {},
    streak: data?.streak ?? 0,
    lastActiveAt: data?.lastActiveAt ?? null,
  };
}
