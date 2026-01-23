import { FaJava } from 'react-icons/fa';
import {
  SiDocker,
  SiExpress,
  SiFigma,
  SiGit,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import SectionHeader from './SectionHeader.jsx';

const technologies = [
  {
    name: 'JavaScript',
    icon: SiJavascript,
    iconClass: 'tech-icon--javascript',
    category: 'core',
  },
  {
    name: 'TypeScript',
    icon: SiTypescript,
    iconClass: 'tech-icon--typescript',
    category: 'core',
  },
  {
    name: 'React',
    icon: SiReact,
    iconClass: 'tech-icon--react',
    category: 'core',
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
    iconClass: 'tech-icon--next',
    category: 'core',
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    iconClass: 'tech-icon--node',
    category: 'core',
  },
  {
    name: 'Express',
    icon: SiExpress,
    iconClass: 'tech-icon--express',
    category: 'backend',
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    iconClass: 'tech-icon--mongodb',
    category: 'database',
  },
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    iconClass: 'tech-icon--postgres',
    category: 'database',
  },
  {
    name: 'Docker',
    icon: SiDocker,
    iconClass: 'tech-icon--docker',
    category: 'devops',
  },
  {
    name: 'Git',
    icon: SiGit,
    iconClass: 'tech-icon--git',
    category: 'devops',
  },
  {
    name: 'Tailwind',
    icon: SiTailwindcss,
    iconClass: 'tech-icon--tailwind',
    category: 'styling',
  },
  {
    name: 'Figma',
    icon: SiFigma,
    iconClass: 'tech-icon--figma',
    category: 'design',
  },
  {
    name: 'Vite',
    icon: SiVite,
    iconClass: 'tech-icon--vite',
    category: 'tools',
  },
  {
    name: 'Prisma',
    icon: SiPrisma,
    iconClass: 'tech-icon--prisma',
    category: 'database',
  },
  {
    name: 'VS Code',
    icon: VscVscode,
    iconClass: 'tech-icon--vscode',
    category: 'tools',
  },
  {
    name: 'Java',
    icon: FaJava,
    iconClass: 'tech-icon--java',
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
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className={`tech-item ${tech.category === 'core' ? 'tech-item--core' : ''}`}
              >
                <Icon className={`tech-icon ${tech.iconClass}`} aria-hidden="true" />
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
