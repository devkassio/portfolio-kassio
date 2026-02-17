import { useEffect } from 'react';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function useScrollReveal(enabled = true) {
  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const reduced = prefersReducedMotion();

    if (reduced) {
      const show = () => {
        for (const el of document.querySelectorAll('[data-reveal]')) {
          el.classList.add('is-visible');
        }
      };
      show();

      /* Observa novos [data-reveal] adicionados depois do mount (lazy) */
      const mo = new MutationObserver((mutations) => {
        for (const m of mutations) {
          for (const node of m.addedNodes) {
            if (node.nodeType !== 1) continue;
            if (node.hasAttribute('data-reveal')) node.classList.add('is-visible');
            for (const child of node.querySelectorAll('[data-reveal]')) {
              child.classList.add('is-visible');
            }
          }
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    document.body.classList.add('reveal-ready');

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: '180px 0px' }
    );

    /* Observa elementos já presentes */
    for (const el of document.querySelectorAll('[data-reveal]')) {
      io.observe(el);
    }

    /* Observa novos [data-reveal] adicionados depois do mount (lazy-loaded) */
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.hasAttribute('data-reveal')) io.observe(node);
          for (const child of node.querySelectorAll('[data-reveal]')) {
            io.observe(child);
          }
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove('reveal-ready');
      io.disconnect();
      mo.disconnect();
    };
  }, [enabled]);
}
