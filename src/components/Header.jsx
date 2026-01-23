import { useEffect, useId, useRef, useState } from 'react';
import { FiDownload, FiGithub, FiLinkedin, FiMenu, FiX } from 'react-icons/fi';

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
        </nav>

        <div className="header-actions">
          <a className="btn btn--ghost" href={contact.resume} download>
            <FiDownload aria-hidden="true" />
            Baixar CV
          </a>
          <div className="header-social">
            <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FiLinkedin aria-hidden="true" />
            </a>
            <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <FiGithub aria-hidden="true" />
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
            {isOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
