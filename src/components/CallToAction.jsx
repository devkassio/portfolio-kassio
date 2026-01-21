import { FiArrowRight, FiCalendar, FiMessageCircle } from 'react-icons/fi';

export default function CallToAction({ contact }) {
  return (
    <section className="cta-section" data-reveal>
      <div className="cta-background" aria-hidden="true">
        <div className="cta-glow cta-glow--1" />
        <div className="cta-glow cta-glow--2" />
      </div>

      <div className="container">
        <div className="cta-content">
          <span className="cta-eyebrow">Pronto para começar?</span>
          <h2 className="cta-title">
            Vamos transformar sua <span className="gradient-text">ideia em realidade</span>
          </h2>
          <p className="cta-description">
            Não deixe seu projeto parado. Entre em contato e vamos discutir como posso ajudar a
            construir uma solução de alto impacto para seu negócio.
          </p>

          <div className="cta-actions">
            <a href={`mailto:${contact.email}`} className="btn btn--primary btn--lg">
              <FiMessageCircle aria-hidden="true" />
              Iniciar conversa
              <FiArrowRight aria-hidden="true" />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost btn--lg"
            >
              <FiCalendar aria-hidden="true" />
              Agendar call
            </a>
          </div>

          <div className="cta-features">
            <div className="cta-feature">
              <span className="cta-feature-icon">⚡</span>
              <span>Resposta em até 24h</span>
            </div>
            <div className="cta-feature">
              <span className="cta-feature-icon">🎯</span>
              <span>Consultoria gratuita</span>
            </div>
            <div className="cta-feature">
              <span className="cta-feature-icon">🚀</span>
              <span>Projetos de qualquer escala</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
