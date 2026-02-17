import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiAward, FiCode, FiGithub, FiTarget, FiTrendingUp, FiZap } from 'react-icons/fi';
import SectionHeader from './SectionHeader.jsx';

const highlights = [
  {
    icon: FiCode,
    title: 'Clean Code',
    description: 'Código limpo, legível e manutenível como prioridade absoluta',
  },
  {
    icon: FiZap,
    title: 'Performance First',
    description: 'Core Web Vitals otimizados, LCP < 2.5s, zero compromisso',
  },
  {
    icon: FiTarget,
    title: 'Problem Solver',
    description: 'Soluções criativas para problemas complexos de negócio',
  },
  {
    icon: FiTrendingUp,
    title: 'Evolução Contínua',
    description: 'Estudo diário para expandir repertório técnico',
  },
];

const journey = [
  {
    year: '2025 / abril',
    title: 'DevClub',
    description: 'Formação intensiva em desenvolvimento web full stack',
  },
  {
    year: '2025 / maio',
    title: 'Freelancer',
    description: 'Projetos próprios e para clientes',
  },
  {
    year: '2025 / dezembro',
    title: 'Front-End Developer',
    description: 'Início na davinTI Soluções em Tecnologia',
  },
  {
    year: 'Agora',
    title: 'Full Stack Developer',
    description: 'Desenvolvendo aplicações completas com React, Node.js e APIs',
  },
];

export default function About({ about, snapshot, reduceMotion = false }) {
  const highlightsRef = useRef(null);
  const journeyRef = useRef(null);
  const isHighlightsInView = useInView(highlightsRef, { once: true, margin: '-100px' });
  const isJourneyInView = useInView(journeyRef, { once: true, margin: '-100px' });
  const shouldAnimate = !reduceMotion;
  const highlightsVisible = shouldAnimate ? isHighlightsInView : true;
  const journeyVisible = shouldAnimate ? isJourneyInView : true;

  return (
    <section id="sobre" className="section section--surface about-section" data-reveal>
      <div className="container">
        <SectionHeader
          eyebrow="Sobre mim"
          title="Quem sou eu"
          description="Desenvolvedor apaixonado por criar experiências digitais excepcionais."
          centered
        />

        <div className="about-main" data-reveal>
          <div className="about-content">
            <div className="about-image-wrapper">
              <div className="about-image-glow" aria-hidden="true" />
              <div className="about-image-frame">
                <img
                  src={about.image}
                  alt={about.imageAlt}
                  width="400"
                  height="480"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
              <div className="about-image-badge">
                <FiAward aria-hidden="true" />
                <span>Full Stack Dev</span>
              </div>
            </div>

            <div className="about-text">
              <h3 className="about-name">Kássio Barros</h3>
              <p className="about-role">Front-End Developer @ davinTI</p>

              <div className="about-bio">
                <p>
                  Desenvolvedor Front-End em evolução contínua, movido por{' '}
                  <strong>propósito, disciplina e crescimento técnico diário</strong>. Construí
                  minha base sólida no DevClub, onde descobri o poder de transformar lógica, design
                  e intenção em aplicações reais.
                </p>
                <p>
                  Atualmente imerso no ecossistema moderno:{' '}
                  <strong>React, TypeScript, Next.js, Node.js</strong> e padrões de arquitetura que
                  tornam o código limpo, organizado e escalável. Foco total em{' '}
                  <strong>JavaScript avançado</strong> e soluções de alto impacto.
                </p>
              </div>

              <div className="about-links">
                <a
                  href={'https://github.com/devkassio'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  <FiGithub aria-hidden="true" />
                  Ver GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="about-highlights" ref={highlightsRef}>
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="highlight-card"
                initial={shouldAnimate ? { opacity: 0, y: 30, scale: 0.95 } : false}
                animate={highlightsVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: shouldAnimate ? 0.5 : 0,
                  delay: shouldAnimate ? index * 0.12 : 0,
                  ease: shouldAnimate ? 'easeOut' : 'linear',
                }}
                whileHover={
                  shouldAnimate
                    ? {
                        y: -10,
                        scale: 1.02,
                        boxShadow: '0 20px 50px rgba(28, 105, 212, 0.25)',
                        transition: { duration: 0.3 },
                      }
                    : undefined
                }
              >
                <motion.div
                  className="highlight-icon"
                  whileHover={shouldAnimate ? { rotate: 360, scale: 1.1 } : undefined}
                  transition={{ duration: shouldAnimate ? 0.6 : 0, type: 'spring' }}
                >
                  <Icon aria-hidden="true" />
                </motion.div>
                <h4 className="highlight-title">{item.title}</h4>
                <p className="highlight-description">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="about-journey" ref={journeyRef}>
          <motion.h3
            className="journey-title"
            initial={shouldAnimate ? { opacity: 0 } : false}
            animate={journeyVisible ? { opacity: 1 } : {}}
            transition={{ duration: shouldAnimate ? 0.5 : 0 }}
          >
            Minha Jornada
          </motion.h3>
          <div className="journey-timeline">
            {journey.map((item, index) => (
              <motion.div
                key={item.year}
                className="journey-item"
                initial={shouldAnimate ? { opacity: 0, x: index % 2 === 0 ? -30 : 30 } : false}
                animate={journeyVisible ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: shouldAnimate ? 0.6 : 0,
                  delay: shouldAnimate ? index * 0.15 : 0,
                  ease: shouldAnimate ? 'easeOut' : 'linear',
                }}
                whileHover={
                  shouldAnimate
                    ? {
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }
                    : undefined
                }
              >
                <div className="journey-marker">
                  <span className="journey-year">{item.year}</span>
                  <motion.div
                    className="journey-dot"
                    initial={shouldAnimate ? { scale: 0 } : false}
                    animate={journeyVisible ? { scale: 1 } : {}}
                    transition={{
                      delay: shouldAnimate ? index * 0.15 + 0.3 : 0,
                      type: shouldAnimate ? 'spring' : 'tween',
                      stiffness: shouldAnimate ? 300 : 0,
                    }}
                  />
                </div>
                <div className="journey-content">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
