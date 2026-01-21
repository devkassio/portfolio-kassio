import { useEffect } from 'react';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) {
      return undefined;
    }

    if (prefersReducedMotion()) {
      for (const element of elements) {
        element.classList.add('is-visible');
      }
      return undefined;
    }

    document.body.classList.add('reveal-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18 }
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => {
      document.body.classList.remove('reveal-ready');
      observer.disconnect();
    };
  }, []);
}
