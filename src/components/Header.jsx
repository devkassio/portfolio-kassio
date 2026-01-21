import { useState } from 'react';
import { FiDownload, FiGithub, FiLinkedin, FiMenu, FiX } from 'react-icons/fi';

export default function Header({ nav, contact }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

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

        <nav className={`site-nav ${isOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
          <ul>
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={closeMenu}>
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
