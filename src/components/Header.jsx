import { useEffect, useId, useRef, useState } from 'react';
import { PiDownloadSimpleBold, PiListBold, PiXBold } from 'react-icons/pi';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import useHeaderScroll from '../hooks/useHeaderScroll.js';
import LanguageToggle from './LanguageToggle.jsx';

export default function Header({ nav, contact }) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const navId = useId();
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);
  const scrollLockRef = useRef(0);

  useHeaderScroll(headerRef, { menuOpen: isOpen });

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const root = document.documentElement;
    let rafId = 0;

    if (!isOpen) {
      return undefined;
    }

    scrollLockRef.current = window.scrollY;
    root.style.setProperty('--scroll-y', `${scrollLockRef.current}px`);
    root.classList.add('menu-open');
    rafId = requestAnimationFrame(() => {
      firstLinkRef.current?.focus();
    });

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      root.classList.remove('menu-open');
      root.style.removeProperty('--scroll-y');
      window.scrollTo({ top: scrollLockRef.current, left: 0, behavior: 'auto' });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        requestAnimationFrame(() => toggleRef.current?.focus());
      }
    };

    const handleResize = () => {
      setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  const handleNavBackdrop = (event) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
      requestAnimationFrame(() => toggleRef.current?.focus());
    }
  };

  const handleNavKeyDown = (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target === event.currentTarget) {
      event.preventDefault();
      setIsOpen(false);
      requestAnimationFrame(() => toggleRef.current?.focus());
    }
  };

  return (
    <header ref={headerRef} className="site-header">
      <div className="container header-inner">
        <a className="logo" href="#inicio" aria-label={t('Ir para o início')}>
          <img
            src="assets/favIconK.png"
            alt={t('Logo Kássio Barros')}
            className="logo-image"
            width="44"
            height="44"
          />
        </a>

        <nav
          id={navId}
          className={`site-nav ${isOpen ? 'is-open' : ''}`}
          aria-label={t('Navegação principal')}
          onClick={handleNavBackdrop}
          onKeyDown={handleNavKeyDown}
        >
          <ul>
            {nav.map((item, index) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={closeMenu} ref={index === 0 ? firstLinkRef : null}>
                  {t(item.label)}
                </a>
              </li>
            ))}
          </ul>
          <div className="site-nav-footer">
            {contact?.resume ? (
              <a
                className="btn btn--primary btn--sm"
                href={contact.resume}
                download
                onClick={closeMenu}
              >
                <PiDownloadSimpleBold aria-hidden="true" />
                {t('Baixar CV')}
              </a>
            ) : null}
            <div className="site-nav-social">
              {contact?.linkedin ? (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  onClick={closeMenu}
                >
                  <SiLinkedin aria-hidden="true" />
                </a>
              ) : null}
              {contact?.github ? (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  onClick={closeMenu}
                >
                  <SiGithub aria-hidden="true" />
                </a>
              ) : null}
            </div>
            <LanguageToggle />
          </div>
        </nav>

        <div className="header-actions">
          <a className="btn btn--ghost" href={contact.resume} download>
            <PiDownloadSimpleBold aria-hidden="true" />
            {t('Baixar CV')}
          </a>
          <div className="header-social">
            <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <SiLinkedin aria-hidden="true" />
            </a>
            <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <SiGithub aria-hidden="true" />
            </a>
          </div>
          <LanguageToggle />
          <button
            ref={toggleRef}
            className="nav-toggle"
            type="button"
            onClick={toggleMenu}
            aria-controls={navId}
            aria-label={isOpen ? t('Fechar menu') : t('Abrir menu')}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <PiXBold key="close" className="nav-toggle-icon" aria-hidden="true" />
            ) : (
              <PiListBold key="open" className="nav-toggle-icon" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
