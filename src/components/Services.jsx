import { FiCode, FiDatabase, FiLayout, FiServer, FiSmartphone, FiZap } from 'react-icons/fi';
import SectionHeader from './SectionHeader.jsx';

const services = [
  {
    icon: FiLayout,
    title: 'Frontend Development',
    description:
      'Interfaces modernas e responsivas com React, TypeScript e Next.js. Performance otimizada e UX impecável.',
    features: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Animações fluidas'],
  },
  {
    icon: FiServer,
    title: 'Backend Development',
    description:
      'APIs robustas e escaláveis com Node.js, Express e bancos de dados modernos. Arquitetura limpa.',
    features: ['Node.js / Express', 'REST APIs', 'Prisma ORM', 'Autenticação JWT'],
  },
  {
    icon: FiDatabase,
    title: 'Database Design',
    description:
      'Modelagem de dados eficiente com SQL e NoSQL. Queries otimizadas e estruturas escaláveis.',
    features: ['MongoDB', 'PostgreSQL', 'Oracle', 'Redis'],
  },
  {
    icon: FiSmartphone,
    title: 'Responsive Design',
    description:
      'Experiências perfeitas em qualquer dispositivo. Mobile-first com foco em performance.',
    features: ['Mobile First', 'PWA Ready', 'Touch Optimized', 'Cross-browser'],
  },
  {
    icon: FiZap,
    title: 'Performance',
    description: 'Otimização agressiva de Core Web Vitals. Sites rápidos que convertem e rankeiam.',
    features: ['Lighthouse 95+', 'Code Splitting', 'Lazy Loading', 'CDN Setup'],
  },
  {
    icon: FiCode,
    title: 'Clean Architecture',
    description: 'Código limpo, testável e manutenível. Padrões SOLID e documentação clara.',
    features: ['Clean Code', 'SOLID', 'Git Flow', 'Code Review'],
  },
];

export default function Services() {
  return (
    <section id="servicos" className="section section--surface services-section" data-reveal>
      <div className="container">
        <SectionHeader
          eyebrow="Especialidades"
          title="O que eu faço"
          description="Transformo ideias em produtos digitais de alto impacto. Do conceito ao deploy."
          centered
        />

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="service-card"
                data-reveal
                style={{ '--reveal-delay': `${index * 0.08}s` }}
              >
                <div className="service-icon-wrapper">
                  <Icon className="service-icon" aria-hidden="true" />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
