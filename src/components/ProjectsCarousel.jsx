import { useKeenSlider } from 'keen-slider/react';
import { useMemo } from 'react';
import { FiArrowLeft, FiArrowRight, FiExternalLink, FiGithub } from 'react-icons/fi';
import { createAutoplay } from '../utils/keenAutoplay.js';
import SectionHeader from './SectionHeader.jsx';

export default function ProjectsCarousel({ projects, githubUrl, reduceMotion = false }) {
  const autoplayPlugin = useMemo(() => {
    if (reduceMotion) {
      return null;
    }
    return createAutoplay(4200);
  }, [reduceMotion]);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 1,
        spacing: 20,
      },
      breakpoints: {
        '(min-width: 700px)': {
          slides: { perView: 2, spacing: 24 },
        },
        '(min-width: 1100px)': {
          slides: { perView: 3, spacing: 28 },
        },
      },
    },
    autoplayPlugin ? [autoplayPlugin] : []
  );

  const repositoriesUrl = githubUrl
    ? `${githubUrl.replace(/\/$/, '')}?tab=repositories`
    : 'https://github.com/devkassio?tab=repositories';

  return (
    <section id="projetos" className="section section--contrast projects-section" data-reveal>
      <div className="container">
        <SectionHeader
          eyebrow="Projetos"
          title="Projetos em Destaque"
          description="Aplicações desenvolvidas com foco em código limpo, performance e experiência do usuário."
        />

        <section className="carousel" aria-label="Projetos em destaque">
          <div ref={sliderRef} className="keen-slider project-slider">
            {projects.map((project) => (
              <article className="keen-slider__slide" key={project.title}>
                <div className="project-card">
                  <div className="project-media">
                    <img
                      src={project.image}
                      alt={`Imagem do projeto ${project.title}`}
                      loading="lazy"
                      decoding="async"
                      width="520"
                      height="320"
                    />
                    <span className="project-category">{project.category}</span>
                  </div>
                  <div className="project-body">
                    <div className="project-header">
                      <h3>{project.title}</h3>
                      <span className="project-year">{project.year}</span>
                    </div>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="project-links">
                      <a href={project.links.github} target="_blank" rel="noreferrer">
                        <FiGithub aria-hidden="true" />
                        GitHub
                      </a>
                      {project.links.demo ? (
                        <a href={project.links.demo} target="_blank" rel="noreferrer">
                          <FiExternalLink aria-hidden="true" />
                          Demo
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="carousel-controls carousel-controls--split">
            <div className="carousel-controls-nav">
              <button
                type="button"
                onClick={() => instanceRef.current?.prev()}
                aria-label="Projeto anterior"
              >
                <FiArrowLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => instanceRef.current?.next()}
                aria-label="Próximo projeto"
              >
                <FiArrowRight aria-hidden="true" />
              </button>
            </div>

            <a
              className="btn btn--outline btn--sm carousel-controls-link"
              href={repositoriesUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub aria-hidden="true" />
              Repositórios
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}
