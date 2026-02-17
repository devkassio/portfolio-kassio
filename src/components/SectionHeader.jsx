export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  centered = false,
}) {
  const resolvedAlign = centered ? 'center' : align;

  return (
    <div className={`section-header section-header--${resolvedAlign}`} data-reveal>
      {eyebrow ? <span className="section-eyebrow">{eyebrow}</span> : null}
      <h2 className="section-title">{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}
