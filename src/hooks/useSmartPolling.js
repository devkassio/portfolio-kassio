import { useCallback, useEffect, useRef, useState } from 'react';

const JITTER_MAX = 3000;

function addJitter(ms) {
  return ms + Math.random() * JITTER_MAX;
}

function readLocalCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.timestamp || !parsed.data) return null;
    return parsed;
  } catch (_e) {
    return null;
  }
}

function writeLocalCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
  } catch (_e) {
    /* quota exceeded — ignore */
  }
}

/**
 * Smart polling hook with:
 * - configurable interval + jitter
 * - visibility-aware pause/resume
 * - progressive backoff on error (base → 2x → 4x)
 * - AbortController per request (race-free)
 * - localStorage warm-start cache
 * - stale detection
 */
export default function useSmartPolling({
  key,
  fetcher,
  interval = 30_000,
  staleAfter = 120_000,
  enabled = true,
}) {
  const [data, setData] = useState(() => {
    const cached = readLocalCache(key);
    return cached ? cached.data : null;
  });
  const [updatedAt, setUpdatedAt] = useState(() => {
    const cached = readLocalCache(key);
    return cached ? cached.timestamp : null;
  });
  const [latency, setLatency] = useState(null);
  const [error, setError] = useState(null);
  const [isStale, setIsStale] = useState(false);

  const abortRef = useRef(null);
  const timeoutRef = useRef(null);
  const backoffRef = useRef(1);
  const mountedRef = useRef(true);

  const doFetch = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const start = performance.now();
    try {
      const result = await fetcher(controller.signal);
      if (!mountedRef.current) return;

      const elapsed = Math.round(performance.now() - start);
      const now = Date.now();

      setData(result);
      setUpdatedAt(now);
      setLatency(elapsed);
      setError(null);
      setIsStale(false);
      backoffRef.current = 1;

      writeLocalCache(key, result);
    } catch (err) {
      if (err.name === 'AbortError' || !mountedRef.current) return;
      setError(err);
      backoffRef.current = Math.min(backoffRef.current * 2, 4);
    }
  }, [key, fetcher]);

  const scheduleNext = useCallback(() => {
    clearTimeout(timeoutRef.current);
    const delay = addJitter(interval * backoffRef.current);
    timeoutRef.current = setTimeout(() => {
      doFetch().then(scheduleNext);
    }, delay);
  }, [interval, doFetch]);

  /* stale checker */
  useEffect(() => {
    if (!updatedAt) return undefined;
    const id = setInterval(() => {
      setIsStale(Date.now() - updatedAt > staleAfter);
    }, 10_000);
    return () => clearInterval(id);
  }, [updatedAt, staleAfter]);

  /* main lifecycle */
  useEffect(() => {
    mountedRef.current = true;
    if (!enabled) return undefined;

    doFetch().then(scheduleNext);

    const onVisibility = () => {
      if (document.hidden) {
        clearTimeout(timeoutRef.current);
      } else {
        doFetch().then(scheduleNext);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      mountedRef.current = false;
      clearTimeout(timeoutRef.current);
      if (abortRef.current) abortRef.current.abort();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [enabled, doFetch, scheduleNext]);

  return { data, updatedAt, latency, error, isStale };
}
