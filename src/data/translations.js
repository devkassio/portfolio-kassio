/**
 * Flat PT-BR → EN dictionary for hardcoded strings in components.
 * O(1) lookup. Zero overhead in PT mode (passthrough).
 *
 * ⚠ Keys MUST match the exact Portuguese string used in JSX.
 */
const translations = {
  /* ── Header ─────────────────────────────── */
  'Baixar CV': 'Download CV',
  'Fechar menu': 'Close menu',
  'Abrir menu': 'Open menu',
  'Pular para o conteúdo': 'Skip to content',
  'Ir para o início': 'Go to top',
  'Navegação principal': 'Main navigation',

  /* ── Nav labels ──────────────────────────── */
  Início: 'Home',
  Sobre: 'About',
  Stack: 'Stack',
  Experiência: 'Experience',
  Projetos: 'Projects',
  Live: 'Live',
  Contato: 'Contact',

  /* ── Hero ─────────────────────────────────── */
  'Disponível para projetos': 'Available for projects',
  'Olá, eu sou': "Hi, I'm",
  'Desenvolvedor apaixonado por criar experiências digitais excepcionais. Transformo ideias complexas em aplicações web elegantes, performáticas e escaláveis.':
    'Passionate developer creating exceptional digital experiences. I transform complex ideas into elegant, performant and scalable web applications.',
  'Ver meu trabalho': 'See my work',
  'Falar comigo': 'Talk to me',
  'Download CV': 'Download CV',
  Scroll: 'Scroll',
  'Rolar para a próxima seção': 'Scroll to next section',

  /* ── About ────────────────────────────────── */
  'Sobre mim': 'About me',
  'Quem sou eu': 'Who I am',
  'Desenvolvedor apaixonado por criar experiências digitais excepcionais.':
    'Developer passionate about creating exceptional digital experiences.',
  'Full Stack Dev': 'Full Stack Dev',
  'Front-End Developer @ davinTI': 'Front-End Developer @ davinTI',
  'Desenvolvedor Front-End em evolução contínua, movido por propósito, disciplina e crescimento técnico diário. Construí minha base sólida no DevClub, onde descobri o poder de transformar lógica, design e intenção em aplicações reais.':
    'Front-End Developer in continuous evolution, driven by purpose, discipline and daily technical growth. I built my solid foundation at DevClub, where I discovered the power of transforming logic, design and intention into real applications.',
  'Atualmente imerso no ecossistema moderno: React, TypeScript, Next.js, Node.js e padrões de arquitetura que tornam o código limpo, organizado e escalável. Foco total em JavaScript avançado e soluções de alto impacto.':
    'Currently immersed in the modern ecosystem: React, TypeScript, Next.js, Node.js and architecture patterns that make code clean, organized and scalable. Total focus on advanced JavaScript and high-impact solutions.',
  'Ver GitHub': 'See GitHub',
  'Minha Jornada': 'My Journey',

  /* ── About highlights ─────────────────────── */
  'Clean Code': 'Clean Code',
  'Performance First': 'Performance First',
  'Problem Solver': 'Problem Solver',
  'Evolução Contínua': 'Continuous Growth',
  'Código limpo, legível e manutenível como prioridade absoluta':
    'Clean, readable and maintainable code as absolute priority',
  'Core Web Vitals otimizados, LCP < 2.5s, zero compromisso':
    'Optimized Core Web Vitals, LCP < 2.5s, zero compromise',
  'Soluções criativas para problemas complexos de negócio':
    'Creative solutions for complex business problems',
  'Estudo diário para expandir repertório técnico': 'Daily study to expand technical repertoire',

  /* ── About journey ────────────────────────── */
  '2025 / abril': '2025 / April',
  '2025 / maio': '2025 / May',
  '2025 / dezembro - Atual': '2025 / December - Current',
  Agora: 'Now',
  DevClub: 'DevClub',
  Freelancer: 'Freelancer',
  'Front-End Developer': 'Front-End Developer',
  'Full Stack Developer': 'Full Stack Developer',
  'Formação intensiva em desenvolvimento web full stack':
    'Intensive training in full stack web development',
  'Projetos próprios e para clientes': 'Personal and client projects',
  'Início na davinTI Soluções em Tecnologia': 'Joined davinTI Soluções em Tecnologia',
  'Desenvolvendo aplicações completas com React, Node.js e APIs':
    'Building complete applications with React, Node.js and APIs',

  /* ── TechStack ────────────────────────────── */
  'Stack Tecnológica': 'Tech Stack',
  'Tecnologias que domino': 'Technologies I master',
  'Ferramentas modernas para construir produtos digitais de alta performance.':
    'Modern tools for building high-performance digital products.',
  'Números em tempo real': 'Real-time numbers',
  'Dados atualizados diretamente do GitHub': 'Data updated directly from GitHub',
  Contribuições: 'Contributions',
  'Dia de streak': 'Day streak',
  'Dias de streak': 'Days streak',
  'Stars totais': 'Total stars',
  Seguidores: 'Followers',
  'Ano de código': 'Year coding',
  'Anos de código': 'Years coding',
  'Atividade dos últimos 28 dias': 'Activity over the last 28 days',
  Menos: 'Less',
  Mais: 'More',
  'Linguagens mais usadas': 'Most used languages',

  /* ── Experience ───────────────────────────── */
  'Experiência Profissional': 'Professional Experience',
  'Onde já atuei': 'Where I worked',
  'Trajetória profissional com foco em desenvolvimento de sistemas robustos e alto desempenho.':
    'Professional trajectory focused on developing robust, high-performance systems.',
  Atual: 'Current',
  'Full-time': 'Full-time',
  Autônomo: 'Freelance',
  Remoto: 'Remote',
  'Principais Contribuições': 'Key Contributions',
  'Tech Stack': 'Tech Stack',

  /* ── Experience — davinTI ─────────────────── */
  'davinTI Soluções em Tecnologia': 'davinTI Soluções em Tecnologia',
  'Atuação no desenvolvimento e manutenção de sistemas enterprise complexos em ambiente corporativo de alto nível, trabalhando com tecnologias de grande porte e frameworks proprietários.':
    'Development and maintenance of complex enterprise systems in a high-level corporate environment, working with large-scale technologies and proprietary frameworks.',
  'Desenvolvimento e manutenção de sistemas enterprise com Java e SQL':
    'Development and maintenance of enterprise systems with Java and SQL',
  'Trabalho com bancos Oracle e PostgreSQL em aplicações de grande escala':
    'Working with Oracle and PostgreSQL databases in large-scale applications',
  'Implementação de rotinas e processos BPM/BPMN':
    'Implementation of BPM/BPMN routines and processes',
  'Desenvolvimento com framework proprietário Vitruvio':
    'Development with proprietary framework Vitruvio',
  'Criação de queries complexas em PL/SQL para regras de negócio':
    'Creation of complex PL/SQL queries for business rules',
  'Colaboração em equipe ágil com foco em entregas contínuas':
    'Agile team collaboration focused on continuous delivery',
  Sistemas: 'Systems',
  Enterprise: 'Enterprise',
  Database: 'Database',
  Framework: 'Framework',

  /* ── Experience — Freelance ───────────────── */
  'Freelance Developer': 'Freelance Developer',
  '2025 - Atual': '2025 - Current',
  'Desenvolvimento de aplicações web modernas e responsivas para clientes diversos, com foco em performance, UX e código escalável.':
    'Development of modern, responsive web applications for diverse clients, focused on performance, UX and scalable code.',
  'Criação de aplicações Full Stack com React, Node.js e MongoDB':
    'Building Full Stack applications with React, Node.js and MongoDB',
  'Desenvolvimento de interfaces modernas com TypeScript e Next.js':
    'Development of modern interfaces with TypeScript and Next.js',
  'Implementação de APIs RESTful escaláveis com Express e Fastify':
    'Implementation of scalable RESTful APIs with Express and Fastify',
  'Integração com serviços externos e sistemas de pagamento':
    'Integration with external services and payment systems',
  'Deploy e configuração de ambientes com Docker e Vercel':
    'Deployment and environment configuration with Docker and Vercel',
  'Consultoria técnica e mentoria para desenvolvedores iniciantes':
    'Technical consulting and mentoring for beginner developers',
  Clientes: 'Clients',
  Satisfeitos: 'Satisfied',
  'Full Stack': 'Full Stack',
  '10+': '10+',

  /* ── Skills ───────────────────────────────── */
  Destaque: 'Featured',
  'Metodologias & Boas Práticas': 'Methodologies & Best Practices',
  'Princípios que guiam cada linha de código.': 'Principles that guide every line of code.',
  'Frontend Development': 'Frontend Development',
  'Interfaces modernas, responsivas e acessíveis': 'Modern, responsive and accessible interfaces',
  'Backend Development': 'Backend Development',
  'APIs escaláveis e arquiteturas robustas': 'Scalable APIs and robust architectures',
  'Database & Storage': 'Database & Storage',
  'Banco de dados relacionais e NoSQL': 'Relational and NoSQL databases',
  'DevOps & Tools': 'DevOps & Tools',
  'Ferramentas e práticas modernas': 'Modern tools and practices',

  /* ── Projects ─────────────────────────────── */
  'Projetos em Destaque': 'Featured Projects',
  'Aplicações desenvolvidas com foco em código limpo, performance e experiência do usuário.':
    'Applications built with focus on clean code, performance and user experience.',
  'Projeto anterior': 'Previous project',
  'Próximo projeto': 'Next project',
  'Imagem do projeto ': 'Project image ',
  Repositórios: 'Repositories',

  /* ── Project descriptions ─────────────────── */
  'Sistema full-stack de gerenciamento de pedidos com painel administrativo completo, autenticação JWT, carrinho de compras e integração de pagamentos. Arquitetura REST API escalável.':
    'Full-stack order management system with complete admin panel, JWT authentication, shopping cart and payment integration. Scalable REST API architecture.',
  'Plataforma interativa de filmes com integração de API externa (TMDb), busca em tempo real, sistema de favoritos e interface responsiva com design moderno e UX otimizada.':
    'Interactive movie platform with external API integration (TMDb), real-time search, favorites system and responsive interface with modern design and optimized UX.',
  'Sistema de seleção dinâmica com troca de cores, imagens e backgrounds usando JavaScript puro. Demonstração de manipulação avançada do DOM.':
    'Dynamic selection system with color, image and background switching using vanilla JavaScript. Advanced DOM manipulation demo.',
  'Este portfólio, construído com React e Vite: foco absoluto em performance, design system consistente e código limpo.':
    'This portfolio, built with React and Vite: absolute focus on performance, consistent design system and clean code.',
  'Website futurista com identidade visual marcante, animações suaves e navegação fluida. Foco em UI/UX premium.':
    'Futuristic website with striking visual identity, smooth animations and fluid navigation. Focus on premium UI/UX.',
  'E-commerce moderno com foco em UI/UX, responsividade impecável e arquitetura de componentes.':
    'Modern e-commerce with focus on UI/UX, flawless responsiveness and component architecture.',
  Frontend: 'Frontend',
  Design: 'Design',

  /* ── Certificates ─────────────────────────── */
  Certificados: 'Certificates',
  'Certificações e validações': 'Certifications and validations',
  'Formação contínua e domínio das principais tecnologias do mercado.':
    'Continuous education and mastery of the main technologies in the market.',
  'Certificado anterior': 'Previous certificate',
  'Próximo certificado': 'Next certificate',
  'Abrir PDF em nova aba': 'Open PDF in new tab',
  'Nova aba': 'New tab',
  Baixar: 'Download',
  Visualizar: 'View',
  'Fechar visualização': 'Close preview',
  'Carregando visualizador…': 'Loading viewer…',

  /* ── Contact ──────────────────────────────── */
  'Vamos conversar?': "Let's talk?",
  'Estou disponível para novos projetos e oportunidades.':
    "I'm available for new projects and opportunities.",
  'Disponível para': 'Available for',
  'Projetos freelance': 'Freelance projects',
  'Consultorias técnicas': 'Technical consulting',
  'Colaborações profissionais': 'Professional collaborations',
  'E-mail': 'E-mail',
  Telefone: 'Phone',
  WhatsApp: 'WhatsApp',
  'Enviar mensagem': 'Send message',
  Localização: 'Location',
  LinkedIn: 'LinkedIn',
  Conectar: 'Connect',
  GitHub: 'GitHub',
  'Ver perfil': 'View profile',
  'Envie uma mensagem': 'Send a message',
  Nome: 'Name',
  'Seu nome completo': 'Your full name',
  'voce@email.com': 'you@email.com',
  Mensagem: 'Message',
  'Conte sobre o projeto ou oportunidade...': 'Tell me about the project or opportunity...',
  'Enviando...': 'Sending...',
  'Informe seu nome completo.': 'Please enter your full name.',
  'Use um e-mail válido.': 'Please use a valid e-mail.',
  'Conte um pouco mais sobre o seu desafio.': 'Tell me a bit more about your challenge.',
  'Enviando mensagem...': 'Sending message...',
  'Mensagem enviada com sucesso!': 'Message sent successfully!',
  'Não foi possível enviar agora. Tente novamente em instantes.':
    'Unable to send right now. Please try again shortly.',

  /* ── Live Section ─────────────────────────── */
  'Em tempo real': 'Real-time',
  'Painel ao vivo com dados do meu dev life — atualizado automaticamente.':
    'Live dashboard with data from my dev life — updated automatically.',
  'Ouvindo agora': 'Listening now',
  'Última faixa': 'Last track',
  'Tocando agora': 'Now playing',
  'Ao vivo': 'Live',
  Recente: 'Recent',
  'Ver no Last.fm': 'View on Last.fm',
  'Atividade Dev': 'Dev Activity',
  'Não foi possível carregar a atividade': 'Unable to load activity',
  'Now Playing': 'Now Playing',
  'Scrobbling não configurado': 'Scrobbling not configured',
  'Não foi possível carregar': 'Unable to load',
  Status: 'Status',
  Online: 'Online',
  Resposta: 'Response',
  'Última atualização': 'Last update',
  Conexões: 'Connections',
  'Parcialmente indisponível': 'Partially unavailable',
  'Todos os serviços OK': 'All services OK',
  'Dados ao vivo': 'Live data',
  agora: 'now',
  'Capa do álbum ': 'Album cover ',

  /* ── Footer ───────────────────────────────── */
  'Kássio Barros': 'Kássio Barros',
  'Logo Kássio Barros': 'Kássio Barros Logo',
  'Links do rodapé': 'Footer links',
  'Todos os direitos reservados.': 'All rights reserved.',
  'Feito com': 'Built with',
  'e React': '& React',
  'Voltar ao topo': 'Back to top',

  /* ── Content.js data ──────────────────────── */
  'Full Stack Developer · High Performance': 'Full Stack Developer · High Performance',
  'Software Developer': 'Software Developer',
  'Front-End Developer | JavaScript, TypeScript & Node.js':
    'Front-End Developer | JavaScript, TypeScript & Node.js',
  'Desenvolvedor em evolução contínua, movido por propósito, disciplina e crescimento técnico diário. Construo aplicações web modernas com foco em performance, código limpo e experiência do usuário.':
    'Developer in continuous evolution, driven by purpose, discipline and daily technical growth. I build modern web applications focused on performance, clean code and user experience.',
  'Disponível para novos projetos': 'Available for new projects',
  'Ver projetos': 'See projects',

  /* ── About content.js ──────────────────────── */
  'Desenvolvedor Front-End em evolução contínua, movido por propósito, disciplina e crescimento técnico diário. Focado em JavaScript avançado, TypeScript, React e Node.js.':
    'Front-End Developer in continuous evolution, driven by purpose, discipline and daily technical growth. Focused on advanced JavaScript, TypeScript, React and Node.js.',
  'Construí minha base em HTML, CSS e JavaScript no DevClub, onde descobri o poder de transformar lógica, design e intenção em aplicações reais, desenvolvendo mentalidade de alta performance e estudo contínuo.':
    'I built my foundation in HTML, CSS and JavaScript at DevClub, where I discovered the power of transforming logic, design and intention into real applications, developing a high-performance mindset and continuous learning.',
  'Venho ampliando minhas competências no ecossistema moderno: React, TypeScript, Next.js, Node.js, Express, MongoDB e padrões de arquitetura que tornam o código limpo, organizado e escalável.':
    'I have been expanding my skills in the modern ecosystem: React, TypeScript, Next.js, Node.js, Express, MongoDB and architecture patterns that make code clean, organized and scalable.',
  'Atualmente, atuo como Front-End Developer na davinTI Soluções em Tecnologia, imerso em um ambiente corporativo de alto nível que acelera minha curva de aprendizado com tecnologias enterprise.':
    'Currently, I work as a Front-End Developer at davinTI Soluções em Tecnologia, immersed in a high-level corporate environment that accelerates my learning curve with enterprise technologies.',
  'Kássio Barros em retrato profissional': 'Kássio Barros professional portrait',
  'Kássio Barros em foto de perfil': 'Kássio Barros profile photo',
  'Repos públicos': 'Public repos',
  'GitHub desde': 'On GitHub since',
  'Stack principal': 'Main stack',
  Base: 'Location',
  'Vamos construir algo incrível juntos': "Let's build something amazing together",
  'Estou sempre aberto para discutir projetos, oportunidades profissionais e colaborações.':
    "I'm always open to discuss projects, professional opportunities and collaborations.",

  /* ── Skills content.js ──────────────────── */
  'Tecnologias que domino para construir aplicações robustas, escaláveis e de alto desempenho.':
    'Technologies I master to build robust, scalable and high-performance applications.',

  /* ── Certificates content.js ──────────────── */
  'JavaScript Avançado': 'Advanced JavaScript',
  'JavaScript Fundamental': 'JavaScript Fundamentals',
  'CSS Avançado': 'Advanced CSS',
  'Banco de Dados Oracle e PL/SQL': 'Oracle Database and PL/SQL',
  'Mapeamento de Processos com Bizagi': 'Process Mapping with Bizagi',
  'IA para Todos': 'AI for Everyone',
  'Evento Nike': 'Nike Event',

  /* ── Values content.js ──────────────────── */
  'Core Web Vitals otimizados. LCP < 2.5s, FID < 100ms, CLS < 0.1. Zero compromisso.':
    'Optimized Core Web Vitals. LCP < 2.5s, FID < 100ms, CLS < 0.1. Zero compromise.',
  'Código auto-documentado, princípios SOLID, DRY e arquitetura escalável.':
    'Self-documenting code, SOLID principles, DRY and scalable architecture.',
  'Estudo diário para elevar repertório, refinar lógica e maturidade técnica.':
    'Daily study to elevate repertoire, refine logic and technical maturity.',
  'Soluções orientadas a resultados com precisão técnica e visão de produto.':
    'Result-oriented solutions with technical precision and product vision.',

  /* ── Heatmap day labels ──────────────────── */
  Dom: 'Sun',
  Seg: 'Mon',
  Ter: 'Tue',
  Qua: 'Wed',
  Qui: 'Thu',
  Sex: 'Fri',
  Sáb: 'Sat',
};

export default translations;
