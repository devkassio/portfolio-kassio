import { useEffect, useId, useRef, useState } from 'react';
import { PiDownloadSimpleBold, PiListBold, PiXBold } from 'react-icons/pi';
import { SiGithub, SiLinkedin } from 'react-icons/si';

export default function Header({ nav, contact }) {
  const [isOpen, setIsOpen] = useState(false);
  const navId = useId();
  const firstLinkRef = useRef(null);
  const scrollLockRef = useRef(0);

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
      closeMenu();
    }
  };

  const handleNavKeyDown = (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target === event.currentTarget) {
      event.preventDefault();
      closeMenu();
    }
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="logo" href="#inicio" aria-label="Ir para o início">
          <img
            src="assets/favIconK.png"
            alt="Logo Kássio Barros"
            className="logo-image"
            width="44"
            height="44"
          />
        </a>

        <nav
          id={navId}
          className={`site-nav ${isOpen ? 'is-open' : ''}`}
          aria-label="Navegação principal"
          onClick={handleNavBackdrop}
          onKeyDown={handleNavKeyDown}
        >
          <ul>
            {nav.map((item, index) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={closeMenu} ref={index === 0 ? firstLinkRef : null}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="site-nav-footer" aria-label="Atalhos rápidos">
            {contact?.resume ? (
              <a
                className="btn btn--primary btn--sm"
                href={contact.resume}
                download
                onClick={closeMenu}
              >
                <PiDownloadSimpleBold aria-hidden="true" />
                Baixar CV
              </a>
            ) : null}
            <div className="site-nav-social" aria-label="Redes sociais">
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
          </div>
        </nav>

        <div className="header-actions">
          <a className="btn btn--ghost" href={contact.resume} download>
            <PiDownloadSimpleBold aria-hidden="true" />
            Baixar CV
          </a>
          <div className="header-social">
            <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <SiLinkedin aria-hidden="true" />
            </a>
            <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <SiGithub aria-hidden="true" />
            </a>
          </div>
          <button
            className="nav-toggle"
            type="button"
            onClick={toggleMenu}
            aria-controls={navId}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <PiXBold className="nav-toggle-icon" aria-hidden="true" />
            ) : (
              <PiListBold className="nav-toggle-icon" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
