import { useCallback } from 'react';
import { PiArrowUpBold, PiEnvelopeSimpleBold } from 'react-icons/pi';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { useLanguage } from '../contexts/LanguageContext.jsx';

export default function Footer({ contact }) {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="footer-gradient-border" aria-hidden="true" />

      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <img
              src="assets/favIconK.png"
              alt={t('Logo Kássio Barros')}
              className="footer-logo-image footer-logo-pulse"
              width="48"
              height="48"
            />
            <div className="footer-brand-info">
              <span className="footer-name">Kássio Barros</span>
              <span className="footer-role">Full Stack Developer</span>
            </div>
          </div>

          <nav className="footer-nav" aria-label={t('Links do rodapé')}>
            <a href="#inicio">{t('Início')}</a>
            <a href="#sobre">{t('Sobre')}</a>
            <a href="#tecnologias">{t('Stack')}</a>
            <a href="#projetos">{t('Projetos')}</a>
            <a href="#contato">{t('Contato')}</a>
          </nav>

          <div className="footer-social">
            <a
              href={contact?.linkedin || 'https://linkedin.com/in/kassiobarros'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="footer-social-link footer-social-link--linkedin"
            >
              <SiLinkedin aria-hidden="true" />
            </a>
            <a
              href={contact?.github || 'https://github.com/devkassio'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="footer-social-link footer-social-link--github"
            >
              <SiGithub aria-hidden="true" />
            </a>
            <a
              href={`mailto:${contact?.email || 'contato@kassiobarros.com'}`}
              aria-label="Email"
              className="footer-social-link footer-social-link--email"
            >
              <PiEnvelopeSimpleBold aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Kássio Barros. {t('Todos os direitos reservados.')}
          </p>

          <button
            type="button"
            className="footer-back-top"
            onClick={scrollToTop}
            aria-label={t('Voltar ao topo')}
          >
            <PiArrowUpBold aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
