const canvas = document.getElementById("particulas");

const ctx = canvas.getContext("2d");

/* AJUSTAR TAMANHO */

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

/* ARRAY */

const particulas = [];

/* QUANTIDADE */

const quantidade = 120;

/* CLASSE */

class Particula {

  constructor() {

    this.x = Math.random() * canvas.width;

    this.y = Math.random() * canvas.height;

    this.raio = Math.random() * 2 + 1;

    this.velocidadeY = Math.random() * 0.5 + 0.2;

    this.opacity = Math.random() * 0.5 + 0.2;

  }

  atualizar() {

    this.y -= this.velocidadeY;

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
      this.raio,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgba(242, 169, 0, ${this.opacity})`;

    ctx.fill();

  }

}

/* CRIAR PARTÍCULAS */

for (let i = 0; i < quantidade; i++) {

  particulas.push(new Particula());

}

/* LOOP */

function animar() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  particulas.forEach(particula => {

    particula.atualizar();

    particula.desenhar();

  });

  requestAnimationFrame(animar);

}

/* INICIAR */

animar();

/* RESPONSIVIDADE */

window.addEventListener("resize", () => {

  canvas.width = window.innerWidth;

  canvas.height = window.innerHeight;

});