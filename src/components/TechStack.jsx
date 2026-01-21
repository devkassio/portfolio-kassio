import SectionHeader from './SectionHeader.jsx';

const technologies = [
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    category: 'core',
  },
  {
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    category: 'core',
  },
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    category: 'core',
  },
  {
    name: 'Next.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-plain.svg',
    category: 'core',
    invert: true,
  },
  {
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    category: 'core',
  },
  {
    name: 'Express',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    category: 'backend',
    invert: true,
  },
  {
    name: 'MongoDB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    category: 'database',
  },
  {
    name: 'PostgreSQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    category: 'database',
  },
  {
    name: 'Docker',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    category: 'devops',
  },
  {
    name: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    category: 'devops',
  },
  {
    name: 'Tailwind',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    category: 'styling',
  },
  {
    name: 'Figma',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    category: 'design',
  },
  {
    name: 'Vite',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',
    category: 'tools',
  },
  {
    name: 'Prisma',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg',
    category: 'database',
    invert: true,
  },
  {
    name: 'VS Code',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    category: 'tools',
  },
  {
    name: 'Java',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
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
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className={`tech-item ${tech.category === 'core' ? 'tech-item--core' : ''}`}
              data-reveal
              style={{ '--reveal-delay': `${index * 0.04}s` }}
            >
              <img
                src={tech.icon}
                alt={tech.name}
                width="48"
                height="48"
                loading="lazy"
                decoding="async"
                style={tech.invert ? { filter: 'invert(1)' } : undefined}
              />
              <span className="tech-name">{tech.name}</span>
            </div>
          ))}
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
