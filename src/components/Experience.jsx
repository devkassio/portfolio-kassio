import { PiArrowSquareOutBold, PiCalendarBold, PiCodeBold, PiMapPinBold } from 'react-icons/pi';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { getTechIconData } from '../utils/techIcons.js';
import SectionHeader from './SectionHeader.jsx';

function ExperienceCard({ experience, index }) {
  const { t } = useLanguage();
  const isCurrentJob = experience.period === 'Atual' || experience.period.includes('Atual');

  return (
    <div className="exp-card" data-reveal style={{ '--reveal-delay': `${index * 0.15}s` }}>
      {isCurrentJob && <div className="exp-current-indicator" />}

      <div className="exp-header">
        <div className="exp-company-info">
          {experience.logo ? (
            <img
              src={experience.logo}
              alt={`Logo ${experience.company}`}
              width="56"
              height="56"
              loading="lazy"
              decoding="async"
              className="exp-logo"
            />
          ) : (
            <div className="exp-logo-placeholder">
              <PiCodeBold aria-hidden="true" />
            </div>
          )}
          <div>
            <h3 className="exp-company">{t(experience.company)}</h3>
            <span className="exp-role">{t(experience.role)}</span>
          </div>
        </div>

        <div className="exp-badges">
          {isCurrentJob && <span className="exp-badge exp-badge--current">{t('Atual')}</span>}
          <span className="exp-badge">{t(experience.type)}</span>
        </div>
      </div>

      <div className="exp-meta">
        <span className="exp-meta-item">
          <PiCalendarBold aria-hidden="true" />
          {experience.period}
        </span>
        <span className="exp-meta-item">
          <PiMapPinBold aria-hidden="true" />
          {t(experience.location)}
        </span>
        {experience.website && (
          <a
            href={experience.website}
            target="_blank"
            rel="noopener noreferrer"
            className="exp-meta-item exp-meta-link"
          >
            <PiArrowSquareOutBold aria-hidden="true" />
            Website
          </a>
        )}
      </div>

      <p className="exp-summary">{t(experience.summary)}</p>

      <div className="exp-highlights">
        <h4>{t('Principais Contribuições')}</h4>
        <ul>
          {experience.highlights.map((item) => (
            <li key={item}>{t(item)}</li>
          ))}
        </ul>
      </div>

      <div className="exp-stack">
        <h4>{t('Tech Stack')}</h4>
        <div className="exp-tags">
          {experience.stack.map((tech) => {
            const iconData = getTechIconData(tech);
            const Icon = iconData?.icon;

            return (
              <span key={tech} className="exp-tag">
                {Icon ? (
                  <Icon
                    className="exp-tag-icon"
                    aria-hidden="true"
                    style={{ color: iconData.color }}
                  />
                ) : null}
                {tech}
              </span>
            );
          })}
        </div>
      </div>

      {experience.achievements && experience.achievements.length > 0 && (
        <div className="exp-achievements">
          {experience.achievements.map((achievement) => (
            <div key={achievement.metric} className="exp-achievement">
              <span className="exp-achievement-value">{achievement.value}</span>
              <span className="exp-achievement-label">{t(achievement.metric)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Experience({ experiences }) {
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section id="experiencia" className="section section--surface exp-section" data-reveal>
      <div className="container">
        <SectionHeader
          eyebrow="Experiência Profissional"
          title="Onde já atuei"
          description="Trajetória profissional com foco em desenvolvimento de sistemas robustos e alto desempenho."
          centered
        />

        <div className="exp-grid">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
