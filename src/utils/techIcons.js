import {
  SiBiome,
  SiCss3,
  SiDocker,
  SiEslint,
  SiExpress,
  SiFastify,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenapiinitiative,
  SiOpenjdk,
  SiOracle,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiThemoviedatabase,
  SiTypescript,
  SiVercel,
  SiVite,
} from 'react-icons/si';
import { TbBrandVscode } from 'react-icons/tb';

const normalizeTechName = (name = '') =>
  name
    .toLowerCase()
    .trim()
    .replace(/\s*\/\s*/g, '/')
    .replace(/\s+/g, ' ');

const techIconMap = new Map();

const registerTechIcon = (names, icon, color) => {
  const data = { icon, color };
  for (const name of names) {
    techIconMap.set(normalizeTechName(name), data);
  }
};

registerTechIcon(['JavaScript'], SiJavascript, '#F7DF1E');
registerTechIcon(['TypeScript'], SiTypescript, '#3178C6');
registerTechIcon(['React', 'React.js'], SiReact, '#61DAFB');
registerTechIcon(['Next.js'], SiNextdotjs, '#FFFFFF');
registerTechIcon(['Node.js'], SiNodedotjs, '#339933');
registerTechIcon(['Express'], SiExpress, '#FFFFFF');
registerTechIcon(['MongoDB'], SiMongodb, '#47A248');
registerTechIcon(['PostgreSQL'], SiPostgresql, '#4169E1');
registerTechIcon(['Docker'], SiDocker, '#2496ED');
registerTechIcon(['Git'], SiGit, '#F05032');
registerTechIcon(['GitHub'], SiGithub, '#FFFFFF');
registerTechIcon(['Git / GitHub'], SiGit, '#F05032');
registerTechIcon(['Tailwind', 'Tailwind CSS', 'CSS3 / Tailwind'], SiTailwindcss, '#06B6D4');
registerTechIcon(['Figma'], SiFigma, '#F24E1E');
registerTechIcon(['Vite'], SiVite, '#646CFF');
registerTechIcon(['Prisma'], SiPrisma, '#FFFFFF');
registerTechIcon(['VS Code'], TbBrandVscode, '#007ACC');
registerTechIcon(['Java'], SiOpenjdk, '#ED8B00');
registerTechIcon(['HTML5'], SiHtml5, '#E34F26');
registerTechIcon(['CSS3'], SiCss3, '#1572B6');
registerTechIcon(['Fastify'], SiFastify, '#FFFFFF');
registerTechIcon(['NestJS'], SiNestjs, '#E0234E');
registerTechIcon(['REST APIs'], SiOpenapiinitiative, '#6BA539');
registerTechIcon(['MySQL'], SiMysql, '#4479A1');
registerTechIcon(['Firebase'], SiFirebase, '#FFCA28');
registerTechIcon(['Oracle'], SiOracle, '#F80000');
registerTechIcon(['SQL', 'PL/SQL', 'SQL / PL/SQL'], SiOracle, '#F80000');
registerTechIcon(['Vercel'], SiVercel, '#FFFFFF');
registerTechIcon(['ESLint'], SiEslint, '#4B32C3');
registerTechIcon(['Biome', 'ESLint / Biome'], SiBiome, '#60A5FA');
registerTechIcon(['JWT'], SiJsonwebtokens, '#D63AFF');
registerTechIcon(['TMDb API'], SiThemoviedatabase, '#01B4E4');

export const getTechIconData = (techName) => techIconMap.get(normalizeTechName(techName)) ?? null;
