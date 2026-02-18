import { useLanguage } from '../contexts/LanguageContext.jsx';

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  centered = false,
}) {
  const { t } = useLanguage();
  const resolvedAlign = centered ? 'center' : align;

  return (
    <div className={`section-header section-header--${resolvedAlign}`} data-reveal>
      {eyebrow ? <span className="section-eyebrow">{t(eyebrow)}</span> : null}
      <h2 className="section-title">{t(title)}</h2>
      {description ? <p className="section-description">{t(description)}</p> : null}
    </div>
  );
}
