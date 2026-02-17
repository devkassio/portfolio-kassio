import { motion } from 'framer-motion';
import { useMemo } from 'react';
import {
  PiArrowRightBold,
  PiCaretDownBold,
  PiDownloadSimpleBold,
  PiMouseSimpleBold,
} from 'react-icons/pi';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { TypeAnimation } from 'react-type-animation';

export default function Hero({ hero, contact, reduceMotion = false }) {
  const particles = useMemo(() => {
    const count = reduceMotion ? 0 : 20;
    return Array.from({ length: count }, (_, index) => ({
      id: `particle-${index}`,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      duration: `${15 + Math.random() * 20}s`,
      delay: `${Math.random() * 5}s`,
    }));
  }, [reduceMotion]);

  const scrollToNext = () => {
    const nextSection = document.querySelector('#sobre');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="hero">
      <div className="hero-background" aria-hidden="true">
        <div className="hero-gradient hero-gradient--1" />
        <div className="hero-gradient hero-gradient--2" />
        <div className="hero-gradient hero-gradient--3" />
        <div className="hero-grid" />
        <div className="hero-noise" />
        <div className="hero-particles">
          {particles.map((particle) => (
            <span
              key={particle.id}
              className="particle"
              style={{
                '--x': particle.x,
                '--y': particle.y,
                '--duration': particle.duration,
                '--delay': particle.delay,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            <span>Disponível para projetos</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-greeting">Olá, eu sou</span>
            <span className="hero-name">{hero.title}</span>
            <span className="hero-role">
              {reduceMotion ? (
                <span>Full Stack Developer</span>
              ) : (
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer',
                    2000,
                    'React Specialist',
                    2000,
                    'Node.js Developer',
                    2000,
                    'TypeScript Expert',
                    2000,
                    'Problem Solver',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Number.POSITIVE_INFINITY}
                  cursor={true}
                />
              )}
            </span>
          </h1>

          <p className="hero-description">
            Desenvolvedor apaixonado por criar <strong>experiências digitais excepcionais</strong>.
            Transformo ideias complexas em aplicações web{' '}
            <strong>elegantes, performáticas e escaláveis</strong>.
          </p>

          <div className="hero-cta">
            <a href="#projetos" className="btn btn--primary btn--lg">
              Ver meu trabalho
              <PiArrowRightBold aria-hidden="true" />
            </a>
            <a href="#contato" className="btn btn--outline btn--lg">
              Falar comigo
            </a>
          </div>

          <div className="hero-social">
            <a
              href={contact?.github || 'https://github.com/devkassio'}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="GitHub"
            >
              <SiGithub />
            </a>
            <a
              href={contact?.linkedin || 'https://linkedin.com/in/kassiobarros'}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="LinkedIn"
            >
              <SiLinkedin />
            </a>
            {contact?.resume && (
              <a
                href={contact.resume}
                download
                className="hero-social-link"
                aria-label="Download CV"
              >
                <PiDownloadSimpleBold />
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="hero-image-wrapper">
            <div className="hero-image-glow" aria-hidden="true" />
            <div className="hero-image-frame">
              <img
                src={hero.image}
                alt={hero.imageAlt}
                width="500"
                height="600"
                decoding="async"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        className="hero-scroll"
        onClick={scrollToNext}
        aria-label="Rolar para a próxima seção"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="scroll-icon-stack">
          <PiMouseSimpleBold className="scroll-mouse-icon" aria-hidden="true" />
          <motion.span
            className="scroll-mouse-arrow"
            animate={{ y: [0, 5, 0], opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          >
            <PiCaretDownBold aria-hidden="true" />
          </motion.span>
        </div>
        <span className="scroll-text">Scroll</span>
      </motion.button>
    </section>
  );
}
