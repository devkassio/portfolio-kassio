import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  PiBriefcaseBold,
  PiCalendarBold,
  PiCircleFill,
  PiGitBranchBold,
  PiGithubLogoBold,
  PiStarBold,
  PiUsersBold,
} from 'react-icons/pi';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import useGithubStats from '../hooks/useGithubStats.js';
import { getTechIconData } from '../utils/techIcons.js';
import SectionHeader from './SectionHeader.jsx';

const COUNTUP_DURATION = 1600;

/**
 * Animated counter that:
 * 1. Triggers on first intersection (scroll into view)
 * 2. Re-animates smoothly from previous → new value when `end` changes (real-time updates)
 * Uses easeOutCubic for natural deceleration.
 */
function CountUp({ end, suffix = '' }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const isVisible = useRef(false);
  const prevEnd = useRef(0);
  const rafId = useRef(0);

  const animateTo = useCallback((from, to) => {
    cancelAnimationFrame(rafId.current);
    const startTime = performance.now();
    const delta = to - from;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / COUNTUP_DURATION, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(from + delta * eased));
      if (progress < 1) {
        rafId.current = requestAnimationFrame(step);
      }
    };
    rafId.current = requestAnimationFrame(step);
  }, []);

  /* Initial animation on scroll into view */
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible.current) {
          isVisible.current = true;
          animateTo(0, end);
          prevEnd.current = end;
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId.current);
    };
  }, [animateTo, end]);

  /* Re-animate when real-time data updates */
  useEffect(() => {
    if (!isVisible.current) return;
    if (end !== prevEnd.current) {
      animateTo(prevEnd.current, end);
      prevEnd.current = end;
    }
  }, [end, animateTo]);

  return (
    <span className="tech-stat-value" ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const technologies = [
  {
    name: 'JavaScript',
    category: 'core',
  },
  {
    name: 'TypeScript',
    category: 'core',
  },
  {
    name: 'React',
    category: 'core',
  },
  {
    name: 'Next.js',
    category: 'core',
  },
  {
    name: 'Node.js',
    category: 'core',
  },
  {
    name: 'Express',
    category: 'backend',
  },
  {
    name: 'MongoDB',
    category: 'database',
  },
  {
    name: 'PostgreSQL',
    category: 'database',
  },
  {
    name: 'Docker',
    category: 'devops',
  },
  {
    name: 'Git',
    category: 'devops',
  },
  {
    name: 'Tailwind',
    category: 'styling',
  },
  {
    name: 'Figma',
    category: 'design',
  },
  {
    name: 'Vite',
    category: 'tools',
  },
  {
    name: 'Prisma',
    category: 'database',
  },
  {
    name: 'VS Code',
    category: 'tools',
  },
  {
    name: 'Java',
    category: 'backend',
  },
];

export default function TechStack({ snapshot }) {
  const { t } = useLanguage();
  const profile = snapshot?.profile;
  const publicRepos = profile?.publicRepos ?? 58;
  const followers = profile?.followers ?? 9;
  const totalStars = snapshot?.totalStars ?? 0;
  const projectCount = snapshot?.projectCount ?? 15;

  const githubStats = useGithubStats({
    username: profile?.login || 'devkassio',
    fallback: 659,
    enabled: !!profile?.login,
  });

  const yearsOfExperience = useMemo(() => {
    const createdAt = profile?.createdAt;
    if (!createdAt) return 1;
    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now - created;
    const years = Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000));
    return Math.max(1, years);
  }, [profile?.createdAt]);

  return (
    <section id="tecnologias" className="section section--contrast tech-section" data-reveal>
      <div className="container">
        <SectionHeader
          eyebrow="Stack Tecnológica"
          title="Tecnologias que domino"
          description="Ferramentas modernas para construir produtos digitais de alta performance."
          centered
        />

        <div className="tech-grid">
          {technologies.map((tech) => {
            const iconData = getTechIconData(tech.name);
            const Icon = iconData?.icon;
            return (
              <div
                key={tech.name}
                className={`tech-item ${tech.category === 'core' ? 'tech-item--core' : ''}`}
              >
                {Icon ? (
                  <Icon
                    className="tech-icon"
                    aria-hidden="true"
                    style={{ color: iconData.color }}
                  />
                ) : (
                  <span className="tech-icon" aria-hidden="true">
                    {tech.name.slice(0, 1)}
                  </span>
                )}
                <span className="tech-name">{tech.name}</span>
              </div>
            );
          })}
        </div>

        <div className="tech-stats-section" data-reveal>
          <div className="tech-stats-header">
            <h3 className="tech-stats-title">{t('Números em tempo real')}</h3>
            <p className="tech-stats-description">
              <PiCircleFill className="live-pulse-dot" aria-hidden="true" />
              {t('Dados atualizados diretamente do GitHub')}
            </p>
          </div>

          <div className="tech-stats">
            <div className="tech-stat">
              <div className="tech-stat-icon tech-stat-icon--repos">
                <PiGithubLogoBold aria-hidden="true" />
              </div>
              <CountUp end={publicRepos} suffix="+" />
              <span className="tech-stat-label">{t('Repositórios')}</span>
            </div>
            <div className="tech-stat">
              <div className="tech-stat-icon tech-stat-icon--contrib">
                <PiGitBranchBold aria-hidden="true" />
              </div>
              <CountUp end={githubStats.total} suffix="+" />
              <span className="tech-stat-label">{t('Contribuições')}</span>
            </div>
            <div className="tech-stat">
              <div className="tech-stat-icon tech-stat-icon--stars">
                <PiStarBold aria-hidden="true" />
              </div>
              <CountUp end={totalStars} suffix="" />
              <span className="tech-stat-label">{t('Stars totais')}</span>
            </div>
            <div className="tech-stat">
              <div className="tech-stat-icon tech-stat-icon--projects">
                <PiBriefcaseBold aria-hidden="true" />
              </div>
              <CountUp end={projectCount} suffix="+" />
              <span className="tech-stat-label">{t('Projetos')}</span>
            </div>
            <div className="tech-stat">
              <div className="tech-stat-icon tech-stat-icon--followers">
                <PiUsersBold aria-hidden="true" />
              </div>
              <CountUp end={followers} suffix="" />
              <span className="tech-stat-label">{t('Seguidores')}</span>
            </div>
            <div className="tech-stat">
              <div className="tech-stat-icon tech-stat-icon--years">
                <PiCalendarBold aria-hidden="true" />
              </div>
              <CountUp end={yearsOfExperience} suffix="+" />
              <span className="tech-stat-label">
                {yearsOfExperience === 1 ? t('Ano de código') : t('Anos de código')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
