import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  PiCodeBold,
  PiLightningBold,
  PiRocketLaunchBold,
  PiStarFourBold,
  PiTargetBold,
  PiTrendUpBold,
  PiTrophyBold,
} from 'react-icons/pi';
import { SiGithub } from 'react-icons/si';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { buildSrcSet } from '../utils/imageSrcset.js';
import SectionHeader from './SectionHeader.jsx';

const highlights = [
  {
    icon: PiCodeBold,
    title: 'Clean Code',
    description: 'Código limpo, legível e manutenível como prioridade absoluta',
    accent: '#6ad2ff',
  },
  {
    icon: PiLightningBold,
    title: 'Performance First',
    description: 'Core Web Vitals otimizados, LCP < 2.5s, zero compromisso',
    accent: '#1c69d4',
  },
  {
    icon: PiTargetBold,
    title: 'Problem Solver',
    description: 'Soluções criativas para problemas complexos de negócio',
    accent: '#a78bfa',
  },
  {
    icon: PiTrendUpBold,
    title: 'Evolução Contínua',
    description: 'Estudo diário para expandir repertório técnico',
    accent: '#34d399',
  },
];

const journey = [
  {
    year: '2025 / abril',
    title: 'DevClub',
    description: 'Formação intensiva em desenvolvimento web full stack',
    icon: PiCodeBold,
  },
  {
    year: '2025 / maio',
    title: 'Freelancer',
    description: 'Projetos próprios e para clientes',
    icon: PiRocketLaunchBold,
  },
  {
    year: '2025 / dezembro - Atual',
    title: 'Front-End Developer',
    description: 'Início na davinTI Soluções em Tecnologia',
    icon: PiTargetBold,
  },
  {
    year: 'Agora',
    title: 'Full Stack Developer',
    description: 'Desenvolvendo aplicações completas com React, Node.js e APIs',
    icon: PiStarFourBold,
  },
];

export default function About({ about, snapshot, reduceMotion = false }) {
  const { t, lang } = useLanguage();
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
                <picture>
                  <source
                    type="image/avif"
                    srcSet={buildSrcSet(about.image, [320, 640, 960], 'avif')}
                    sizes="(min-width: 900px) 400px, 85vw"
                  />
                  <source
                    type="image/webp"
                    srcSet={buildSrcSet(about.image, [320, 640, 960], 'webp')}
                    sizes="(min-width: 900px) 400px, 85vw"
                  />
                  <img
                    src={about.image}
                    alt={about.imageAlt}
                    width="400"
                    height="480"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              <div className="about-image-badge">
                <PiTrophyBold aria-hidden="true" />
                <span>{t('Full Stack Dev')}</span>
              </div>
            </div>

            <div className="about-text">
              <h3 className="about-name">Kássio Barros</h3>
              <p className="about-role">{t('Front-End Developer @ davinTI')}</p>

              <div className="about-bio">
                {lang === 'pt' ? (
                  <>
                    <p>
                      Desenvolvedor Front-End em evolução contínua, movido por{' '}
                      <strong>propósito, disciplina e crescimento técnico diário</strong>. Construí
                      minha base sólida no DevClub, onde descobri o poder de transformar lógica,
                      design e intenção em aplicações reais.
                    </p>
                    <p>
                      Atualmente imerso no ecossistema moderno:{' '}
                      <strong>React, TypeScript, Next.js, Node.js</strong> e padrões de arquitetura
                      que tornam o código limpo, organizado e escalável. Foco total em{' '}
                      <strong>JavaScript avançado</strong> e soluções de alto impacto.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Front-End Developer in continuous evolution, driven by{' '}
                      <strong>purpose, discipline and daily technical growth</strong>. I built my
                      solid foundation at DevClub, where I discovered the power of transforming
                      logic, design and intention into real applications.
                    </p>
                    <p>
                      Currently immersed in the modern ecosystem:{' '}
                      <strong>React, TypeScript, Next.js, Node.js</strong> and architecture patterns
                      that make code clean, organized and scalable. Total focus on{' '}
                      <strong>advanced JavaScript</strong> and high-impact solutions.
                    </p>
                  </>
                )}
              </div>

              <div className="about-links">
                <a
                  href={snapshot?.profile?.htmlUrl || 'https://github.com/devkassio'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  <SiGithub aria-hidden="true" />
                  {t('Ver GitHub')}
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
                style={{ '--card-accent': item.accent }}
                initial={shouldAnimate ? { opacity: 0, y: 40 } : false}
                animate={highlightsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: shouldAnimate ? 0.6 : 0,
                  delay: shouldAnimate ? index * 0.12 : 0,
                  ease: shouldAnimate ? [0.22, 1, 0.36, 1] : 'linear',
                }}
                whileHover={
                  shouldAnimate
                    ? {
                        y: -8,
                        transition: { duration: 0.3, ease: 'easeOut' },
                      }
                    : undefined
                }
              >
                <div className="highlight-card-glow" aria-hidden="true" />
                <span className="highlight-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <div className="highlight-icon">
                  <Icon aria-hidden="true" />
                </div>
                <h4 className="highlight-title">{t(item.title)}</h4>
                <p className="highlight-description">{t(item.description)}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="about-journey" ref={journeyRef}>
          <motion.h3
            className="journey-title"
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={journeyVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: shouldAnimate ? 0.5 : 0 }}
          >
            {t('Minha Jornada')}
          </motion.h3>

          <div className="journey-timeline">
            <div className="journey-line" aria-hidden="true">
              <motion.div
                className="journey-line-fill"
                initial={shouldAnimate ? { scaleY: 0 } : false}
                animate={journeyVisible ? { scaleY: 1 } : {}}
                transition={{
                  duration: shouldAnimate ? 1.2 : 0,
                  ease: shouldAnimate ? [0.22, 1, 0.36, 1] : 'linear',
                }}
              />
            </div>

            {journey.map((item, index) => {
              const StepIcon = item.icon;
              return (
                <motion.div
                  key={item.year}
                  className="journey-step"
                  initial={shouldAnimate ? { opacity: 0, x: index % 2 === 0 ? -40 : 40 } : false}
                  animate={journeyVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: shouldAnimate ? 0.6 : 0,
                    delay: shouldAnimate ? 0.3 + index * 0.2 : 0,
                    ease: shouldAnimate ? [0.22, 1, 0.36, 1] : 'linear',
                  }}
                >
                  <motion.div
                    className="journey-node"
                    initial={shouldAnimate ? { scale: 0 } : false}
                    animate={journeyVisible ? { scale: 1 } : {}}
                    transition={{
                      delay: shouldAnimate ? 0.5 + index * 0.2 : 0,
                      type: shouldAnimate ? 'spring' : 'tween',
                      stiffness: shouldAnimate ? 260 : 0,
                      damping: shouldAnimate ? 20 : 0,
                    }}
                  >
                    <StepIcon aria-hidden="true" />
                  </motion.div>

                  <div className="journey-card">
                    <span className="journey-year">{t(item.year)}</span>
                    <h4 className="journey-card-title">{t(item.title)}</h4>
                    <p className="journey-card-desc">{t(item.description)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
