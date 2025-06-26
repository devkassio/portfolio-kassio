window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

const sections = document.querySelectorAll('.section')

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  {
    threshold: 0.1,
  }
)

sections.forEach(section => {
  observer.observe(section)
})

async function fetchRepos() {
  const username = 'devkassio'
  const res = await fetch(`https://api.github.com/users/${username}/repos`)
  const repos = await res.json()
  const grid = document.getElementById('projetos-grid')

  grid.innerHTML = '';

  repos.forEach(repo => {
    const imgSrc = `assets/${repo.name}.png`

    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
    <img src="${imgSrc}" alt="${repo.name}">
    <div class="card-content">
    <h3>${repo.name}</h3>
     <p>${repo.description || 'Sem descrição.'}</p>
        <a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
      </div>
      `;
    grid.appendChild(card)
  })

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => observer.observe(card));

  VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 15, speed: 400, glare: true, "max-glare": 0.2
  });
  document.getElementById('projetos').classList.add('visible');
}

document.addEventListener('DOMContentLoaded', () => {
  type();
  fetchRepos();
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
let isDeleting = false;

function type() {
  const current = phrases[phraseIndex];

  if (!isDeleting) {
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
        setTimeout(type, 5000); // Delay entre text1 e text2
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
        setTimeout(() => {
          isDeleting = true;
          charIndex = current.text2.length;
          deleteText();
        }, 10000); // Delay antes de apagar
      }
    }
  }
}

function deleteText() {
  const current = phrases[phraseIndex];
  if (charIndex > 0) {
    typingElement.innerHTML = `
      <span class="texto1">${current.text1}</span>
      <span class="texto2">${current.text2.substring(0, charIndex - 1)}</span>
    `;
    charIndex--;
    setTimeout(deleteText, 50);
  } else {
    deleteText1(current.text1.length);
  }
}

function deleteText1(length) {
  const current = phrases[phraseIndex];
  if (length > 0) {
    typingElement.innerHTML = `
      <span class="texto1">${current.text1.substring(0, length - 1)}</span>
    `;
    setTimeout(() => deleteText1(length - 1), 50);
  } else {
    charIndex = 0;
    typingText1 = true;
    isDeleting = false;
    setTimeout(type, 4000); // Pequeno delay antes de recomeçar
  }
}


document.addEventListener('DOMContentLoaded', () => {
  // delay de 2s antes de disparar a animação de typing
  setTimeout(() => {
    type();
  }, 10000);

  // carregamento de repositórios
  fetchRepos();
});

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
/*
document.getElementById('menu-toggle').addEventListener('click', function () {
  document.getElementById('menu').classList.toggle('show');
});*/


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

      // Remover o hash da URL após um pequeno delay
      setTimeout(() => {
        history.pushState("", document.title, window.location.pathname + window.location.search);
      }, 600); // tempo suficiente para o scroll terminar
    }
  });
});