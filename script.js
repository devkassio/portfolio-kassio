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
    const username = 'santosxis'
    const res = await fetch(`https://api.github.com/users/${username}/repos`)
    const repos = await res.json()
    const grid = document.getElementById('projetos-grid')

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
}

fetchRepos()

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
            typingElement.innerHTML += `<span class="texto1">${current.text1.charAt(charIndex)}</span>`;
            charIndex++;
            setTimeout(type, 80);
        } else {
            charIndex = 0;
            typingText1 = false;
            setTimeout(type, 300)
        }
    } else {
       if (charIndex < current.text2.length) {
        typingElement.innerHTML += `<span class="texto2">${current.text2.charAt(charIndex)}</span>`;
      charIndex++;
      setTimeout(type, 80);
       }
    }

}

document.addEventListener('DOMContentLoaded', () => {
    type();
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