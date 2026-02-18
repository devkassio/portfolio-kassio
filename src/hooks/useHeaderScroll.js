import { useEffect, useRef } from 'react';

const SCROLL_THRESHOLD = 8;
const MENU_CLOSE_COOLDOWN = 600;

/**
 * Esconde o header ao rolar ↓ e mostra ao rolar ↑.
 * Performance-first: passive listener + rAF batching + refs (zero re-render).
 * Cooldown após fechar menu impede hide durante scroll restoration + anchor nav.
 *
 * @param {React.RefObject<HTMLElement>} headerRef  ref do `<header>`
 * @param {{ menuOpen: boolean }} options
 */
export default function useHeaderScroll(headerRef, { menuOpen = false } = {}) {
  const lastY = useRef(0);
  const ticking = useRef(false);
  const hidden = useRef(false);
  const height = useRef(0);
  const menuOpenRef = useRef(menuOpen);
  const cooldownRef = useRef(false);

  /* ── Sync menuOpen: garantir header visível + cooldown ao fechar ── */
  useEffect(() => {
    menuOpenRef.current = menuOpen;
    const header = headerRef.current;

    if (menuOpen) {
      if (header && hidden.current) {
        header.classList.remove('is-hidden');
        hidden.current = false;
      }
      return undefined;
    }

    /* Menu fechou — cooldown absorve scroll restoration + anchor navigation */
    cooldownRef.current = true;
    if (header && hidden.current) {
      header.classList.remove('is-hidden');
      hidden.current = false;
    }

    const timer = setTimeout(() => {
      lastY.current = window.scrollY;
      cooldownRef.current = false;
    }, MENU_CLOSE_COOLDOWN);

    return () => clearTimeout(timer);
  }, [menuOpen, headerRef]);

  /* ── Scroll + resize listeners ── */
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return undefined;

    const measure = () => {
      height.current = header.offsetHeight;
    };

    measure();
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        ticking.current = false;

        if (menuOpenRef.current || cooldownRef.current) return;

        const y = window.scrollY;
        const delta = y - lastY.current;

        /* Sempre visível no topo da página */
        if (y <= height.current) {
          if (hidden.current) {
            header.classList.remove('is-hidden');
            hidden.current = false;
          }
          lastY.current = y;
          return;
        }

        /* Histerese: ignorar micro-scrolls (< 8 px) */
        if (Math.abs(delta) < SCROLL_THRESHOLD) return;

        const shouldHide = delta > 0;

        if (shouldHide !== hidden.current) {
          header.classList.toggle('is-hidden', shouldHide);
          hidden.current = shouldHide;
        }

        lastY.current = y;
      });
    };

    const onResize = () => {
      requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, [headerRef]);
}
