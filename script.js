/* ==========================================================================
   CANVAS PARTÍCULAS
========================================================================== */

const canvas = document.getElementById("particulas");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* ==========================================================================
   ARRAY DE PARTÍCULAS
========================================================================== */

const particulas = [];

/* ==========================================================================
   CLASSE PARTÍCULA
========================================================================== */

class Particula {

  constructor() {

    this.x = Math.random() * canvas.width;

    this.y = Math.random() * canvas.height;

    this.radius = Math.random() * 2;

    this.speedY = Math.random() * 0.5 + 0.2;

    this.opacity = Math.random();

  }

  atualizar() {

    this.y -= this.speedY;

    if (this.y < 0) {

      this.y = canvas.height;

      this.x = Math.random() * canvas.width;

    }

  }

  desenhar() {

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;

    ctx.fill();

  }

}

/* ==========================================================================
   CRIAR PARTÍCULAS
========================================================================== */

for (let i = 0; i < 120; i++) {

  particulas.push(new Particula());

}

/* ==========================================================================
   ANIMAÇÃO
========================================================================== */

function animarParticulas() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  particulas.forEach((particula) => {

    particula.atualizar();

    particula.desenhar();

  });

  requestAnimationFrame(animarParticulas);

}

animarParticulas();

/* ==========================================================================
   RESPONSIVIDADE CANVAS
========================================================================== */

window.addEventListener("resize", () => {

  canvas.width = window.innerWidth;

  canvas.height = window.innerHeight;

});

/* ==========================================================================
   PARALLAX CÓSMICO
========================================================================== */

const universo = document.querySelector(".universo");

const nebulosa = document.querySelector(".nebulosa");

const container = document.querySelector(".teia-de-luz-container");

window.addEventListener("scroll", () => {

  const scrollY = window.scrollY;

  universo.style.transform =
    `translateY(${scrollY * 0.15}px)`;

  nebulosa.style.transform =
    `translateY(${scrollY * 0.25}px) scale(1.08)`;

  container.style.transform =
    `translateY(${scrollY * 0.03}px)`;

});

/* ==========================================================================
   ENTRADA CINEMATOGRÁFICA
========================================================================== */

const paineis = document.querySelectorAll(".painel-hq");

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry, index) => {

    if (entry.isIntersecting) {

      setTimeout(() => {

        entry.target.classList.add("painel-visivel");

      }, index * 250);

    }

  });

}, {
  threshold: 0.2
});

paineis.forEach((painel) => {

  observer.observe(painel);

});

/* ==========================================================================
   CARTAS MÍSTICAS
========================================================================== */

const cartas = document.querySelectorAll(".carta");

cartas.forEach((carta) => {

  carta.addEventListener("click", () => {

    carta.classList.toggle("virada");

  });

});

/* ==========================================================================
   VOZ DO GATO DE LUZ
========================================================================== */

const botoesAudio =
  document.querySelectorAll(".botao-audio");

botoesAudio.forEach((botao) => {

  botao.addEventListener("click", (evento) => {

    evento.stopPropagation();

    const carta =
      botao.closest(".carta-back");

    const titulo =
      carta.querySelector("h3").innerText;

    const mensagem =
      carta.querySelector("p").innerText;

    const textCompleto = 
      `${titulo}. ${mensagem}`;

    const narracao =
      new SpeechSynthesisUtterance(textCompleto);

    narracao.lang = "pt-BR";

    narracao.rate = 0.9;

    narracao.pitch = 1;

    narracao.volume = 1;

    speechSynthesis.cancel();

    speechSynthesis.speak(narracao);

  });

});

/* ==========================================================================
   PARTÍCULAS MÁGICAS DAS CARTAS
========================================================================== */

cartas.forEach((carta) => {

  carta.addEventListener("click", () => {

    criarParticulasMagicas(carta);

  });

});

/* ==========================================================================
   FUNÇÃO PARTÍCULAS
========================================================================== */

function criarParticulasMagicas(carta) {

  for (let i = 0; i < 25; i++) {

    const particula =
      document.createElement("div");

    particula.classList.add("particula-magica");

    const rect = carta.getBoundingClientRect();

    particula.style.left =
      rect.width / 2 + "px";

    particula.style.top =
      rect.height / 2 + "px";

    const x =
      (Math.random() - 0.5) * 300 + "px";

    const y =
      (Math.random() - 0.5) * 300 + "px";

    particula.style.setProperty("--x", x);

    particula.style.setProperty("--y", y);

    carta.appendChild(particula);

    setTimeout(() => {

      particula.remove();

    }, 1500);

  }

}