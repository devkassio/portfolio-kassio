import { getTechIconData } from '../utils/techIcons.js';
import SectionHeader from './SectionHeader.jsx';

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

export default function TechStack() {
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

        <div className="tech-stats" data-reveal>
          <div className="tech-stat">
            <span className="tech-stat-value">58+</span>
            <span className="tech-stat-label">Repositórios GitHub</span>
          </div>
          <div className="tech-stat">
            <span className="tech-stat-value">659+</span>
            <span className="tech-stat-label">Contribuições no último ano</span>
          </div>
          <div className="tech-stat">
            <span className="tech-stat-value">10+</span>
            <span className="tech-stat-label">Projetos entregues</span>
          </div>
          <div className="tech-stat">
            <span className="tech-stat-value">1+</span>
            <span className="tech-stat-label">Ano de experiência</span>
          </div>
        </div>
      </div>
    </section>
  );
}
