import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { getTechIconData } from '../utils/techIcons.js';
import SectionHeader from './SectionHeader.jsx';

function TechCard({ tech, index, categoryIndex, reduceMotion }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const shouldAnimate = !reduceMotion;
  const isVisible = shouldAnimate ? isInView : true;
  const [isHovered, setIsHovered] = useState(false);

  const techData = getTechIconData(tech.name) || { icon: null, color: '#61DAFB' };
  const IconComponent = techData.icon;

  return (
    <motion.div
      ref={ref}
      className={`tech-card ${tech.highlight ? 'tech-card--highlight' : ''}`}
      initial={shouldAnimate ? { opacity: 0, scale: 0.8, y: 20 } : false}
      animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: shouldAnimate ? 0.4 : 0,
        delay: shouldAnimate ? categoryIndex * 0.1 + index * 0.05 : 0,
        ease: shouldAnimate ? [0.25, 0.46, 0.45, 0.94] : 'linear',
      }}
      onMouseEnter={shouldAnimate ? () => setIsHovered(true) : undefined}
      onMouseLeave={shouldAnimate ? () => setIsHovered(false) : undefined}
      whileHover={
        shouldAnimate
          ? {
              y: -8,
              scale: 1.05,
            }
          : undefined
      }
      style={{
        '--tech-color': techData.color,
      }}
    >
      <motion.div
        className="tech-icon-wrapper"
        animate={
          shouldAnimate
            ? {
                boxShadow: isHovered
                  ? `0 0 30px ${techData.color}40, 0 0 60px ${techData.color}20`
                  : '0 8px 32px rgba(0,0,0,0.3)',
              }
            : undefined
        }
        transition={{ duration: shouldAnimate ? 0.3 : 0 }}
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

function SkillCategory({ category, categoryIndex, reduceMotion }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const shouldAnimate = !reduceMotion;
  const isVisible = shouldAnimate ? isInView : true;

  return (
    <motion.div
      ref={ref}
      className="skill-category"
      initial={shouldAnimate ? { opacity: 0, y: 40 } : false}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: shouldAnimate ? 0.6 : 0,
        delay: shouldAnimate ? categoryIndex * 0.15 : 0,
        ease: shouldAnimate ? 'easeOut' : 'linear',
      }}
    >
      <div className="skill-category-header">
        <motion.span
          className="skill-category-icon"
          aria-hidden="true"
          whileHover={shouldAnimate ? { scale: 1.2, rotate: 10 } : undefined}
          transition={{ type: 'spring', stiffness: shouldAnimate ? 300 : 0 }}
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
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </motion.div>
  );
}

function MethodologyItem({ method, index, reduceMotion }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const shouldAnimate = !reduceMotion;
  const isVisible = shouldAnimate ? isInView : true;

  return (
    <motion.div
      ref={ref}
      className="methodology-item"
      initial={shouldAnimate ? { opacity: 0, scale: 0.8 } : false}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: shouldAnimate ? 0.4 : 0,
        delay: shouldAnimate ? index * 0.1 : 0,
        type: shouldAnimate ? 'spring' : 'tween',
        stiffness: shouldAnimate ? 200 : 0,
      }}
      whileHover={
        shouldAnimate
          ? {
              scale: 1.08,
              y: -4,
              transition: { duration: 0.2 },
            }
          : undefined
      }
    >
      <motion.span
        className="methodology-icon"
        aria-hidden="true"
        whileHover={shouldAnimate ? { rotate: 360 } : undefined}
        transition={{ duration: shouldAnimate ? 0.5 : 0 }}
      >
        {method.icon}
      </motion.span>
      <span className="methodology-name">{method.name}</span>
    </motion.div>
  );
}

export default function Skills({ skills, reduceMotion = false }) {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const shouldAnimate = !reduceMotion;
  const isHeaderVisible = shouldAnimate ? isHeaderInView : true;

  return (
    <section id="skills" className="section section--surface skills-section">
      <div className="container">
        <motion.div
          ref={headerRef}
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          animate={isHeaderVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldAnimate ? 0.6 : 0 }}
        >
          <SectionHeader
            eyebrow="Stack Tecnológica"
            title={skills.title}
            description={skills.description}
          />
        </motion.div>

        <div className="skills-grid">
          {skills.categories.map((category, index) => (
            <SkillCategory
              key={category.title}
              category={category}
              categoryIndex={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {skills.methodologies && skills.methodologies.length > 0 && (
          <div className="methodologies-section">
            <motion.h3
              className="methodologies-title"
              initial={shouldAnimate ? { opacity: 0 } : false}
              whileInView={shouldAnimate ? { opacity: 1 } : undefined}
              viewport={shouldAnimate ? { once: true } : undefined}
              transition={{ delay: shouldAnimate ? 0.2 : 0 }}
            >
              Metodologias & Boas Práticas
            </motion.h3>
            <div className="methodologies-grid">
              {skills.methodologies.map((method, index) => (
                <MethodologyItem
                  key={method.name}
                  method={method}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
