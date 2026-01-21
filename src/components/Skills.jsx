import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiPrisma,
  SiFastify,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiOracle,
  SiGit,
  SiGithub,
  SiDocker,
  SiVercel,
  SiVite,
  SiEslint,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import SectionHeader from './SectionHeader.jsx';

// Mapeamento de ícones para cada tecnologia
const techIcons = {
  JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  'React.js': { icon: SiReact, color: '#61DAFB' },
  'Next.js': { icon: SiNextdotjs, color: '#ffffff' },
  HTML5: { icon: SiHtml5, color: '#E34F26' },
  'CSS3 / Tailwind': { icon: SiTailwindcss, color: '#06B6D4' },
  CSS3: { icon: SiCss3, color: '#1572B6' },
  Java: { icon: FaJava, color: '#ED8B00' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  Express: { icon: SiExpress, color: '#ffffff' },
  Fastify: { icon: SiFastify, color: '#ffffff' },
  NestJS: { icon: SiNestjs, color: '#E0234E' },
  Prisma: { icon: SiPrisma, color: '#2D3748' },
  'REST APIs': { icon: SiNodedotjs, color: '#68A063' },
  MongoDB: { icon: SiMongodb, color: '#47A248' },
  PostgreSQL: { icon: SiPostgresql, color: '#4169E1' },
  MySQL: { icon: SiMysql, color: '#4479A1' },
  Firebase: { icon: SiFirebase, color: '#FFCA28' },
  'SQL / PL/SQL': { icon: SiOracle, color: '#F80000' },
  Oracle: { icon: SiOracle, color: '#F80000' },
  'Git / GitHub': { icon: SiGithub, color: '#ffffff' },
  Docker: { icon: SiDocker, color: '#2496ED' },
  Vercel: { icon: SiVercel, color: '#ffffff' },
  Vite: { icon: SiVite, color: '#646CFF' },
  'ESLint / Biome': { icon: SiEslint, color: '#4B32C3' },
  'VS Code': { icon: VscVscode, color: '#007ACC' },
};

function TechCard({ tech, index, categoryIndex }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const [isHovered, setIsHovered] = useState(false);
  
  const techData = techIcons[tech.name] || { icon: null, color: '#61DAFB' };
  const IconComponent = techData.icon;
  
  return (
    <motion.div
      ref={ref}
      className={`tech-card ${tech.highlight ? 'tech-card--highlight' : ''}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.4,
        delay: categoryIndex * 0.1 + index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -8,
        scale: 1.05,
      }}
      style={{
        '--tech-color': techData.color,
      }}
    >
      <motion.div
        className="tech-icon-wrapper"
        animate={{
          boxShadow: isHovered 
            ? `0 0 30px ${techData.color}40, 0 0 60px ${techData.color}20`
            : '0 8px 32px rgba(0,0,0,0.3)',
        }}
        transition={{ duration: 0.3 }}
      >
        {IconComponent ? (
          <IconComponent 
            className="tech-icon" 
            style={{ color: isHovered ? techData.color : 'var(--color-text)' }}
          />
        ) : (
          <span className="tech-icon-fallback" style={{ fontSize: '1.5rem' }}>
            💻
          </span>
        )}
      </motion.div>
      <span className="tech-name">{tech.name}</span>
      {tech.highlight && <span className="tech-badge">Destaque</span>}
    </motion.div>
  );
}

function SkillCategory({ category, categoryIndex }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="skill-category"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: categoryIndex * 0.15,
        ease: 'easeOut',
      }}
    >
      <div className="skill-category-header">
        <motion.span
          className="skill-category-icon"
          aria-hidden="true"
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {category.icon}
        </motion.span>
        <div className="skill-category-info">
          <h3>{category.title}</h3>
          {category.description && <p>{category.description}</p>}
        </div>
      </div>

      <div className="tech-grid">
        {category.items.map((item, index) => (
          <TechCard
            key={typeof item === 'string' ? item : item.name}
            tech={typeof item === 'string' ? { name: item } : item}
            index={index}
            categoryIndex={categoryIndex}
          />
        ))}
      </div>
    </motion.div>
  );
}

function MethodologyItem({ method, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="methodology-item"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 200,
      }}
      whileHover={{
        scale: 1.08,
        y: -4,
        transition: { duration: 0.2 },
      }}
    >
      <motion.span
        className="methodology-icon"
        aria-hidden="true"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        {method.icon}
      </motion.span>
      <span className="methodology-name">{method.name}</span>
    </motion.div>
  );
}

export default function Skills({ skills }) {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="skills" className="section section--surface skills-section">
      <div className="container">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="Stack Tecnológica"
            title={skills.title}
            description={skills.description}
          />
        </motion.div>

        <div className="skills-grid">
          {skills.categories.map((category, index) => (
            <SkillCategory key={category.title} category={category} categoryIndex={index} />
          ))}
        </div>

        {skills.methodologies && skills.methodologies.length > 0 && (
          <div className="methodologies-section">
            <motion.h3
              className="methodologies-title"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Metodologias & Boas Práticas
            </motion.h3>
            <div className="methodologies-grid">
              {skills.methodologies.map((method, index) => (
                <MethodologyItem key={method.name} method={method} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
