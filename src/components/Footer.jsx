import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer({ contact }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />

      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <img 
              src="assets/favIconK.png" 
              alt="Logo Kássio Barros" 
              className="footer-logo-image" 
              width="48" 
              height="48" 
            />
            <div className="footer-brand-info">
              <span className="footer-name">Kássio Barros</span>
              <span className="footer-role">Full Stack Developer</span>
            </div>
          </div>

          <nav className="footer-nav" aria-label="Links do rodapé">
            <a href="#inicio">Início</a>
            <a href="#sobre">Sobre</a>
            <a href="#tecnologias">Stack</a>
            <a href="#projetos">Projetos</a>
            <a href="#contato">Contato</a>
          </nav>

          <div className="footer-social">
            <a
              href={contact?.linkedin || 'https://linkedin.com/in/kassiobarros'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="footer-social-link"
            >
              <FiLinkedin />
            </a>
            <a
              href={contact?.github || 'https://github.com/devkassio'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="footer-social-link"
            >
              <FiGithub />
            </a>
            <a
              href={`mailto:${contact?.email || 'contato@kassiobarros.com'}`}
              aria-label="Email"
              className="footer-social-link"
            >
              <FiMail />
            </a>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Kássio Barros. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
