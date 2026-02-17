import { useEffect } from 'react';
import { buildResponsiveSrc } from '../utils/imageSrcset.js';

const AVIF_TEST =
  'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAG1pZjFhdmlmAAACAGF2MDEAAAAAAAEAAQACAAAAAA==';
const WEBP_TEST = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';

const hasConnection = () => {
  if (typeof navigator === 'undefined') {
    return null;
  }
  return navigator.connection || navigator.mozConnection || navigator.webkitConnection;
};

const shouldSkipWarmup = () => {
  const connection = hasConnection();
  if (!connection) {
    return false;
  }
  if (connection.saveData) {
    return true;
  }
  const effectiveType = connection.effectiveType || '';
  return effectiveType.includes('2g');
};

const supportsFormat = (dataUri) =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = dataUri;
  });

const detectBestFormat = async () => {
  if (await supportsFormat(AVIF_TEST)) {
    return 'avif';
  }
  if (await supportsFormat(WEBP_TEST)) {
    return 'webp';
  }
  return null;
};

const pickClosestWidth = (widths, displayWidth, dpr) => {
  if (!Array.isArray(widths) || widths.length === 0) {
    return null;
  }
  const sorted = [...widths].sort((a, b) => a - b);
  const target = Math.ceil(displayWidth * dpr);
  return sorted.find((width) => width >= target) || sorted[sorted.length - 1];
};

const preloadImage = (src) =>
  new Promise((resolve) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });

const runWarmupQueue = async (urls, concurrency = 3) => {
  const queue = [...urls];
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const next = queue.shift();
      if (!next) {
        return;
      }
      await preloadImage(next);
    }
  });
  await Promise.all(workers);
};

export default function useAssetWarmup({ assets = [], enabled = true }) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || assets.length === 0 || shouldSkipWarmup()) {
      return undefined;
    }

    const cacheKey = 'portfolio-assets-warmed';
    try {
      if (window.sessionStorage.getItem(cacheKey)) {
        return undefined;
      }
    } catch {
      // If sessionStorage is unavailable, continue without caching.
    }

    let cancelled = false;

    const startWarmup = async () => {
      const format = await detectBestFormat();
      if (cancelled) {
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewportWidth = window.innerWidth || 360;

      const urls = assets
        .slice()
        .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
        .map((asset) => {
          const displayWidth = asset.displayWidth || viewportWidth;
          if (format && asset.widths?.length) {
            const width = pickClosestWidth(asset.widths, displayWidth, dpr);
            if (width) {
              return buildResponsiveSrc(asset.src, width, format);
            }
          }
          return asset.src;
        })
        .filter(Boolean);

      const uniqueUrls = Array.from(new Set(urls));
      await runWarmupQueue(uniqueUrls);

      try {
        window.sessionStorage.setItem(cacheKey, 'true');
      } catch {
        // noop
      }
    };

    const schedule =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback(startWarmup, { timeout: 2500 })
        : window.setTimeout(startWarmup, 1200);

    return () => {
      cancelled = true;
      if (typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(schedule);
      } else {
        window.clearTimeout(schedule);
      }
    };
  }, [assets, enabled]);
}
