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
  const res = await fetch(`https://api.github.com/users/${username}/repos?type=all&sort=updated`);
  const repos = await res.json();
  const grid = document.getElementById('all-projects');

  grid.innerHTML = '';

  repos.forEach(repo => {
    if (repo.archived) return; // Só projetos ativos
    const imgSrc = `assets/${repo.name}.png`;
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${imgSrc}" alt="${repo.name}" loading="lazy">
      <div class="card-content">
        <h3>${repo.name}</h3>
        <p>${repo.description || 'Sem descrição.'}</p>
        <a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
      </div>
    `;
    grid.appendChild(card);
  });

  const cards = grid.querySelectorAll('.card');
  cards.forEach(card => observer.observe(card));

  VanillaTilt.init(cards, {
    max: 15, speed: 400, glare: true, "max-glare": 0.2
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa typing
  type();

  // Inicializa cards featured com tilt
  const featuredCards = document.querySelectorAll('#featured-projects .card');
  featuredCards.forEach(card => observer.observe(card));
  VanillaTilt.init(featuredCards, {
    max: 15, speed: 400, glare: true, "max-glare": 0.2
  });

  // Botão Ver Mais e Ver Menos
  const loadMoreBtn = document.getElementById('load-more-projects');
  const loadLessBtn = document.getElementById('load-less-projects');
  const featuredProjects = document.getElementById('featured-projects');
  const allProjects = document.getElementById('all-projects');

  loadMoreBtn.addEventListener('click', () => {
    loadMoreBtn.style.display = 'none';
    loadLessBtn.style.display = 'block';
    featuredProjects.style.display = 'none';
    allProjects.style.display = 'grid';
    fetchRepos();
  });

  loadLessBtn.addEventListener('click', () => {
    loadLessBtn.style.display = 'none';
    loadMoreBtn.style.display = 'block';
    allProjects.style.display = 'none';
    featuredProjects.style.display = 'grid';
    allProjects.innerHTML = ''; // Limpa os projetos carregados para performance
  });

  // Envio de formulário (placeholder, configure com Formspree ou similar)
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Mensagem enviada!'); // Substitua por fetch real
  });
});

const typingElement = document.getElementById('typing');
const phrases = [
  {
    text1: " Olá, eu sou",
    text2: " Kássio Barros"
  }
];

let phraseIndex = 0;
let charIndex = 0;
let typingText1 = true;

function type() {
  const current = phrases[phraseIndex];

  if (typingText1) {
    if (charIndex < current.text1.length) {
      typingElement.innerHTML = `
        <span class="texto1">${current.text1.substring(0, charIndex + 1)}</span>
      `;
      charIndex++;
      setTimeout(type, 80);
    } else {
      typingText1 = false;
      charIndex = 0;
      setTimeout(type, 200); // Delay entre text1 e text2, corrigido para não loop infinito
    }
  } else {
    if (charIndex < current.text2.length) {
      typingElement.innerHTML = `
        <span class="texto1">${current.text1}</span>
        <span class="texto2">${current.text2.substring(0, charIndex + 1)}</span>
      `;
      charIndex++;
      setTimeout(type, 80);
    } else {
      // Para aqui, sem deletar ou loop, corrigindo bug
    }
  }
}

particlesJS("particles-js", {
  "particles": {
    "number": { "value": 60 },
    "size": { "value": 3 },
    "color": { "value": "#00d4ff" },
    "line_linked": {
      "enable": true,
      "color": "#00d4ff"
    },
    "move": {
      "enable": true,
      "speed": 1
    }
  }
});

particlesJS("particles-sobre", {
  particles: {
    number: { value: 40, density: { enable: true, value_area: 800 } },
    color: { value: "#00d4ff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    line_linked: { enable: true, distance: 150, color: "#00d4ff", opacity: 0.4, width: 1 },
    move: { enable: true, speed: 2 }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" }
    },
    modes: {
      repulse: { distance: 100 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.fill');
      fills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0';
        setTimeout(() => {
          fill.style.width = width;
        }, 100);
      });
    }
  });
}, {
  threshold: 0.5
});

document.querySelectorAll('.skill').forEach(skill => skillsObserver.observe(skill));

particlesJS("particles-habilidades", {
  particles: {
    number: { value: 60 },
    color: { value: "#00f7ff" },
    shape: { type: "circle" },
    opacity: { value: 0.3 },
    size: { value: 3 },
    move: { enable: true, speed: 2 }
  },
  interactivity: {
    events: { onhover: { enable: true, mode: "repulse" } },
    modes: { repulse: { distance: 100 } }
  },
  retina_detect: true
});

particlesJS("particles-contato", {
  particles: {
    number: { value: 60 },
    color: { value: "#00f7ff" },
    shape: { type: "circle" },
    opacity: { value: 0.3 },
    size: { value: 3 },
    move: { enable: true, speed: 2 }
  },
  interactivity: {
    events: { onhover: { enable: true, mode: "repulse" } },
    modes: { repulse: { distance: 100 } }
  },
  retina_detect: true
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetID = this.getAttribute('href');
    const targetElement = document.querySelector(targetID);

    if (targetElement) {
      const targetPosition = targetElement.offsetTop;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      setTimeout(() => {
        history.pushState("", document.title, window.location.pathname + window.location.search);
      }, 600);
    }
  });
});

// Lightbox JS
let currentIndex = 0;
const images = [
  'assets/certificado-html-css.jpg',
  'assets/certificado-javascript.jpg',
  'assets/certificado-nike.jpg'
  // Adicione mais URLs aqui para certificados adicionais
];

function openLightbox(index) {
  currentIndex = index;
  document.getElementById('lightbox-img').src = images[currentIndex];
  document.getElementById('lightbox').style.display = 'block';
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