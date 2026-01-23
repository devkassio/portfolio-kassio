import About from './components/About.jsx';
import CertificatesCarousel from './components/CertificatesCarousel.jsx';
import Contact from './components/Contact.jsx';
import Experience from './components/Experience.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProjectsCarousel from './components/ProjectsCarousel.jsx';
import Skills from './components/Skills.jsx';
import TechStack from './components/TechStack.jsx';
import { content } from './data/content.js';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';
import useAssetWarmup from './hooks/useAssetWarmup.js';
import useGithubSnapshot from './hooks/useGithubSnapshot.js';
import useLowPowerMode from './hooks/useLowPowerMode.js';
import useScrollReveal from './hooks/useScrollReveal.js';

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const isLowPower = useLowPowerMode();
  const shouldReduceMotion = prefersReducedMotion || isLowPower;

  useScrollReveal(!shouldReduceMotion);

  const warmupAssets = useMemo(
    () => [
      { src: content.hero.image, displayWidth: 380, priority: 1 },
      { src: content.about.image, displayWidth: 360, priority: 2 },
      ...content.projects.map((project) => ({
        src: project.image,
        widths: [360, 720, 1080],
        displayWidth: 360,
        priority: 3,
      })),
      ...content.experiences
        .filter((experience) => experience.logo)
        .map((experience) => ({
          src: experience.logo,
          displayWidth: 72,
          priority: 4,
        })),
      ...content.certificates
        .filter((certificate) => !certificate.isPdf)
        .map((certificate) => ({
          src: certificate.image,
          displayWidth: 520,
          priority: 5,
        })),
    ],
    []
  );

  useAssetWarmup({ assets: warmupAssets });

  const githubSnapshot = useGithubSnapshot({
    username: content.github.username,
    fallback: content.github,
    enabled: !isLowPower,
  });

  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? 'always' : 'never'}>
      <a className="skip-link" href="#inicio">
        Pular para o conteúdo
      </a>
      <Header nav={content.nav} contact={content.contact} />
      <main>
        <Hero hero={content.hero} contact={content.contact} reduceMotion={shouldReduceMotion} />
        <About
          about={content.about}
          values={content.values}
          snapshot={githubSnapshot}
          reduceMotion={shouldReduceMotion}
        />
        <TechStack />
        <Experience experiences={content.experiences} />
        <Skills skills={content.skills} reduceMotion={shouldReduceMotion} />
        <ProjectsCarousel
          projects={content.projects}
          githubUrl={content.contact.github}
          reduceMotion={shouldReduceMotion}
        />
        <CertificatesCarousel
          certificates={content.certificates}
          reduceMotion={shouldReduceMotion}
        />
        <Contact contact={content.contact} />
      </main>
      <Footer contact={content.contact} />
    </MotionConfig>
  );
}
