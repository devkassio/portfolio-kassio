window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

sections.forEach(section => {
  observer.observe(section);
});

async function fetchRepos() {
  const username = 'devkassio';
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?type=all&sort=updated`
  );
  const repos = await res.json();
  const grid = document.getElementById('all-projects');

  grid.innerHTML = '';

  repos.forEach((repo, index) => {
    if (repo.archived) return; // Só projetos ativos

    // Determinar categoria baseada no nome/descrição
    let category = 'frontend';
    if (
      repo.description?.toLowerCase().includes('backend') ||
      repo.description?.toLowerCase().includes('api')
    ) {
      category = 'fullstack';
    } else if (
      repo.description?.toLowerCase().includes('design') ||
      repo.description?.toLowerCase().includes('ui')
    ) {
      category = 'design';
    }

    // Determinar tecnologia principal
    let tech = 'js';
    if (repo.language === 'HTML') tech = 'html';
    else if (repo.language === 'CSS') tech = 'css';
    else if (repo.language === 'TypeScript') tech = 'ts';

    const card = document.createElement('div');
    card.className = 'project-card-extraordinary';
    card.setAttribute('data-category', category);
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';

    card.innerHTML = `
      <div class="proj-glow-bg"></div>
      <div class="proj-header">
        <div class="proj-badge ${tech}">
          <i class="fab fa-${
            tech === 'js'
              ? 'js-square'
              : tech === 'html'
              ? 'html5'
              : tech === 'css'
              ? 'css3-alt'
              : tech === 'ts'
              ? 'js-square'
              : 'code'
          }"></i>
        </div>
        <div class="proj-level">${
          category === 'fullstack'
            ? 'Full Stack'
            : category === 'design'
            ? 'Design'
            : 'Frontend'
        }</div>
      </div>
      <div class="proj-image-container">
        <img src="assets/${
          repo.name === 'portfolio-kassio'
            ? 'portfolio-kassio.jpg'
            : repo.name + '.png'
        }" alt="${
      repo.name
    }" loading="lazy" onerror="this.src='assets/default-project.jpg'">
        <div class="proj-overlay">
          <div class="proj-actions">
            <a href="${repo.html_url}" target="_blank" class="proj-btn github">
              <i class="fab fa-github"></i>
              <span>GitHub</span>
            </a>
            ${
              repo.homepage
                ? `<a href="${repo.homepage}" target="_blank" class="proj-btn demo">
              <i class="fas fa-external-link-alt"></i>
              <span>Demo</span>
            </a>`
                : ''
            }
          </div>
        </div>
      </div>
      <div class="proj-content">
        <h3>${repo.name
          .replace(/-/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase())}</h3>
        <p>${
          repo.description ||
          'Projeto desenvolvido com foco em qualidade e boas práticas de desenvolvimento.'
        }</p>
        <div class="proj-details">
          <span class="proj-status">
            <i class="fas fa-check-circle"></i>
            Concluído
          </span>
          <span class="proj-year">
            <i class="fas fa-calendar"></i>
            ${new Date(repo.created_at).getFullYear()}
          </span>
        </div>
        <div class="proj-tech-stack">
          <span class="tech-tag ${tech}">${repo.language || 'JavaScript'}</span>
          <span class="tech-tag responsive">Responsive</span>
          ${repo.topics
            .slice(0, 2)
            .map(topic => `<span class="tech-tag">${topic}</span>`)
            .join('')}
        </div>
      </div>
    `;

    grid.appendChild(card);

    // Animação de entrada escalonada
    setTimeout(() => {
      card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 150);
  });

  // Inicializar efeitos nos novos cards
  initProjectCards();
}

document.addEventListener('DOMContentLoaded', () => {
  // Aguarda um pequeno delay para garantir que todos os elementos estejam renderizados
  setTimeout(() => {
    // Inicializa counter de estatísticas
    initStatsCounter();

    // Inicializa efeito de typing
    initTypingEffect();

    // Inicializa cards featured com tilt
    const featuredCards = document.querySelectorAll(
      '#featured-projects .project-card-extraordinary'
    );
    featuredCards.forEach(card => observer.observe(card));

    // Inicializar efeitos de projetos
    initProjectFilters();
    initProjectCards();

    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        document.querySelector('#sobre').scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Botão Ver Mais e Ver Menos para Projetos
    const loadMoreBtn = document.getElementById('load-more-projects');
    const loadLessBtn = document.getElementById('load-less-projects');
    const featuredProjects = document.getElementById('featured-projects');
    const allProjects = document.getElementById('all-projects');

    if (loadMoreBtn && loadLessBtn && featuredProjects && allProjects) {
      loadMoreBtn.addEventListener('click', () => {
        loadMoreBtn.style.display = 'none';
        loadLessBtn.style.display = 'inline-flex';
        featuredProjects.style.display = 'none';
        allProjects.style.display = 'grid';
        fetchRepos();
      });

      loadLessBtn.addEventListener('click', () => {
        loadLessBtn.style.display = 'none';
        loadMoreBtn.style.display = 'inline-flex';
        allProjects.style.display = 'none';
        featuredProjects.style.display = 'grid';
        allProjects.innerHTML = ''; // Limpa os projetos carregados para performance
      });
    }

    // Initialize Certificate Filters
    initCertificateFilters();

    // Initialize Certificate Cards Animation
    initCertificateCards();

    // Initialize EmailJS with your credentials (new API)
    (function () {
      emailjs.init({
        publicKey: 'IcSov-EgznR__YE5f',
      });
    })();

    // Form submission with real email sending
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', async e => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      // Validate form
      if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos!');
        return;
      }

      // Show loading state
      const submitBtn = form.querySelector('.submit-btn-extraordinary');
      const originalText = submitBtn.querySelector('.btn-text').textContent;
      submitBtn.querySelector('.btn-text').textContent = 'Enviando...';
      submitBtn.disabled = true;

      try {
        // Send email using EmailJS with your template structure
        const templateParams = {
          subject: `Nova mensagem do portfólio - ${name}`,
          name: name,
          email: email,
          message: message,
        };

        // Send real email using your EmailJS configuration
        await emailjs.send(
          'service_jbsyv7l',
          'template_ahonab8',
          templateParams
        );

        // Show success message
        successMessage.style.display = 'block';
        form.reset();

        // Reset button
        submitBtn.querySelector('.btn-text').textContent = originalText;
        submitBtn.disabled = false;

        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 5000);

        // Success log
        console.log('Email enviado com sucesso para kassioxis@icloud.com');
      } catch (error) {
        console.error('Erro ao enviar email:', error);

        // Show detailed error message
        let errorMessage = 'Erro ao enviar mensagem. ';
        if (error.text) {
          errorMessage += `Detalhes: ${error.text}`;
        } else {
          errorMessage += 'Tente novamente em alguns instantes.';
        }

        alert(errorMessage);

        // Reset button
        submitBtn.querySelector('.btn-text').textContent = originalText;
        submitBtn.disabled = false;
      }
    });

    // Header scroll effect
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header-turbo');

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
        header.style.backdropFilter = 'blur(25px)';
      } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
      }

      // Hide/show header on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }

      lastScrollY = currentScrollY;
    });
  }, 100); // Pequeno delay para garantir renderização
});

// Função para efeito de typing nos títulos
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  const words = ['Full Stack', 'Frontend', 'Backend'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      // Apagando caracteres
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 100;
    } else {
      // Digitando caracteres
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Palavra completa, aguarda um pouco antes de apagar
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Palavra completamente apagada, vai para a próxima
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  // Inicia o efeito
  type();
}

// Função para animar contadores de estatísticas
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');

  const observerStats = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalNumber = parseInt(target.getAttribute('data-count'));
          animateCounter(target, finalNumber);
          observerStats.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(stat => observerStats.observe(stat));
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50; // Duração da animação
  const hasPlus = element.textContent.includes('+');

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    // Adiciona o "+" se o texto original tinha
    const displayValue = Math.floor(current) + (hasPlus ? '+' : '');
    element.textContent = displayValue;
  }, 30);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetID = this.getAttribute('href');
    const targetElement = document.querySelector(targetID);

    if (targetElement) {
      const targetPosition = targetElement.offsetTop;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      setTimeout(() => {
        history.pushState(
          '',
          document.title,
          window.location.pathname + window.location.search
        );
      }, 600);
    }
  });
});

// Lightbox JS
let currentIndex = 0;
const images = [
  'assets/certificado-html-css.jpg', // 0 - HTML & CSS
  'assets/certificado-javascript.jpg', // 1 - JavaScript
  'assets/Certificado- nodeJS.png', // 2 - Node.js
  'assets/Certificado-JsAvançado.png', // 3 - JavaScript Avançado
  'assets/Certificado-CssAvançado .png', // 4 - CSS Avançado (note o espaço no nome)
  'assets/certificado-nike.jpg', // 5 - Nike Event
  'assets/Certificado - React.png', // 6 - React
];

function openLightbox(index) {
  currentIndex = index;
  document.getElementById('lightbox-img').src = images[currentIndex];
  document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function changeImage(direction) {
  currentIndex += direction;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  document.getElementById('lightbox-img').src = images[currentIndex];
}

// Function to view PDF certificates
function viewPdfCertificate(pdfPath) {
  window.open(pdfPath, '_blank');
}

// Certificate Filters Functionality
function initCertificateFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const certificateCards = document.querySelectorAll('.certificate-card-new');

  if (!filterButtons.length || !certificateCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Get filter category
      const filterCategory = button.getAttribute('data-category');

      // Filter certificates
      filterCertificates(filterCategory, certificateCards);
    });
  });
}

function filterCertificates(category, cards) {
  cards.forEach((card, index) => {
    const cardCategory = card.getAttribute('data-category');

    if (category === 'all' || cardCategory === category) {
      // Show card with animation
      card.style.display = 'block';
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';

      setTimeout(() => {
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    } else {
      // Hide card with animation
      card.style.transition = 'all 0.3s ease';
      card.style.opacity = '0';
      card.style.transform = 'translateY(-20px)';

      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
}

// Certificate Cards Animations and Interactions
function initCertificateCards() {
  const certificateCards = document.querySelectorAll('.certificate-card-new');

  if (!certificateCards.length) return;

  // Add hover sound effect (optional)
  certificateCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Add dynamic glow effect
      card.style.setProperty('--glow-intensity', '1');
    });

    card.addEventListener('mouseleave', () => {
      // Remove glow effect
      card.style.setProperty('--glow-intensity', '0');
    });

    // Add click animation
    card.addEventListener('click', () => {
      // Create ripple effect
      createRippleEffect(card);
    });
  });

  // Initialize card entrance animations
  const observerCerts = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observerCerts.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  certificateCards.forEach(card => {
    observerCerts.observe(card);
  });
}

function createRippleEffect(element) {
  // Remove existing ripples
  const existingRipples = element.querySelectorAll('.ripple');
  existingRipples.forEach(ripple => ripple.remove());

  // Create new ripple
  const ripple = document.createElement('div');
  ripple.className = 'ripple';

  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = rect.width / 2;
  const y = rect.height / 2;

  ripple.style.cssText = `
    position: absolute;
    top: ${y - size / 2}px;
    left: ${x - size / 2}px;
    width: ${size}px;
    height: ${size}px;
    background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    transform: scale(0);
    animation: rippleAnimation 0.6s ease-out;
    pointer-events: none;
    z-index: 1;
  `;

  element.style.position = 'relative';
  element.appendChild(ripple);

  // Remove ripple after animation
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add CSS animation for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleAnimation {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }

  .certificate-card-new.animate-in {
    animation: certCardSlideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
`;
document.head.appendChild(rippleStyle);

// Project Filters Functionality
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn-proj');
  const projectCards = document.querySelectorAll('.project-card-extraordinary');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Get filter category
      const filterCategory = button.getAttribute('data-category');

      // Filter projects
      filterProjects(filterCategory, projectCards);
    });
  });
}

function filterProjects(category, cards) {
  cards.forEach((card, index) => {
    const cardCategory = card.getAttribute('data-category');

    if (category === 'all' || cardCategory === category) {
      // Show card with animation
      card.style.display = 'block';
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';

      setTimeout(() => {
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    } else {
      // Hide card with animation
      card.style.transition = 'all 0.3s ease';
      card.style.opacity = '0';
      card.style.transform = 'translateY(-20px)';

      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
}

// Project Cards Animations and Interactions
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card-extraordinary');

  if (!projectCards.length) return;

  // Add mouse tracking for glow effect
  projectCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });

    card.addEventListener('mouseenter', () => {
      // Add dynamic glow effect
      card.style.setProperty('--glow-intensity', '1');
    });

    card.addEventListener('mouseleave', () => {
      // Remove glow effect
      card.style.setProperty('--glow-intensity', '0');
    });

    // Add click animation
    card.addEventListener('click', e => {
      // Don't trigger if clicking on a link
      if (e.target.tagName !== 'A' && !e.target.closest('a')) {
        // Create ripple effect
        createProjectRippleEffect(card, e);
      }
    });
  });

  // Initialize card entrance animations
  const observerProjects = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observerProjects.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  projectCards.forEach(card => {
    observerProjects.observe(card);
  });
}

function createProjectRippleEffect(element, event) {
  // Remove existing ripples
  const existingRipples = element.querySelectorAll('.proj-ripple');
  existingRipples.forEach(ripple => ripple.remove());

  // Create new ripple
  const ripple = document.createElement('div');
  ripple.className = 'proj-ripple';

  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  ripple.style.cssText = `
    position: absolute;
    top: ${y - size / 2}px;
    left: ${x - size / 2}px;
    width: ${size}px;
    height: ${size}px;
    background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    transform: scale(0);
    animation: projRippleAnimation 0.6s ease-out;
    pointer-events: none;
    z-index: 1;
  `;

  element.style.position = 'relative';
  element.appendChild(ripple);

  // Remove ripple after animation
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add CSS for project ripple effect
const projectRippleStyle = document.createElement('style');
projectRippleStyle.textContent = `
  @keyframes projRippleAnimation {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }

  .project-card-extraordinary.animate-in {
    animation: projCardSlideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @keyframes projCardSlideIn {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(projectRippleStyle);
