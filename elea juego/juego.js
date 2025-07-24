const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let naveImg = new Image();
naveImg.src = "img/nave.png";

let enemigoImg = new Image();
enemigoImg.src = "img/enemigo.png";

let nivel = 1;
let enemigos = [];
let balas = [];
let vidas = 5;
let nave = { x: 225, y: 540, width: 50, height: 50 };
let teclas = {};
let puntos = 0;
let enemigosRestantes = 0;
let gameOver = false;

const winnerDiv = document.getElementById("winner");
const gameOverDiv = document.getElementById("gameover");

document.addEventListener("keydown", (e) => teclas[e.key] = true);
document.addEventListener("keyup", (e) => teclas[e.key] = false);

function crearEnemigos() {
  enemigos = [];
  let filas = 2 + nivel;
  let columnas = 6;
  enemigosRestantes = filas * columnas;
  for (let f = 0; f < filas; f++) {
    for (let c = 0; c < columnas; c++) {
      enemigos.push({
        x: 60 + c * 60,
        y: 40 + f * 50,
        width: 40,
        height: 40,
        vivo: true,
        velocidad: 0.1 + nivel * 0.05
      });
    }
  }
}

function disparar() {
  balas.push({ x: nave.x + nave.width / 2 - 2, y: nave.y, width: 4, height: 10 });
}

function moverNave() {
  if (teclas["ArrowLeft"] && nave.x > 0) nave.x -= 5;
  if (teclas["ArrowRight"] && nave.x < canvas.width - nave.width) nave.x += 5;
  if (teclas[" "] && balas.length < 5) disparar();
}

function moverBalas() {
  balas.forEach((bala, i) => {
    bala.y -= 8;
    if (bala.y < 0) balas.splice(i, 1);
  });
}

function colisiones() {
  enemigos.forEach((enemigo) => {
    balas.forEach((bala, bi) => {
      if (enemigo.vivo &&
          bala.x < enemigo.x + enemigo.width &&
          bala.x + bala.width > enemigo.x &&
          bala.y < enemigo.y + enemigo.height &&
          bala.y + bala.height > enemigo.y) {
        enemigo.vivo = false;
        enemigosRestantes--;
        puntos += 10;
        balas.splice(bi, 1);
      }
    });

    if (enemigo.vivo && enemigo.y + enemigo.height >= nave.y) {
      enemigo.vivo = false;
      vidas--;
      if (vidas <= 0) {
        gameOver = true;
        gameOverDiv.classList.remove("oculto");
        setTimeout(() => location.reload(), 3000);
      }
    }
  });
}

function mostrarWinner() {
  winnerDiv.classList.remove("oculto");
  setTimeout(() => {
    nivel++;
    winnerDiv.classList.add("oculto");
    crearEnemigos();
  }, 2000);
}

function dibujar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.font = "16px monospace";
  ctx.fillText(`Puntos: ${puntos} | Nivel: ${nivel} | Vidas: ${vidas}`, 10, 20);
  ctx.drawImage(naveImg, nave.x, nave.y, nave.width, nave.height);
  ctx.fillStyle = "white";
  balas.forEach(bala => ctx.fillRect(bala.x, bala.y, bala.width, bala.height));
  enemigos.forEach(enemigo => {
    if (enemigo.vivo) {
      enemigo.y += enemigo.velocidad;
      ctx.drawImage(enemigoImg, enemigo.x, enemigo.y, enemigo.width, enemigo.height);
    }
  });
}

function loop() {
  if (!gameOver) {
    moverNave();
    moverBalas();
    colisiones();
    dibujar();
    if (enemigosRestantes <= 0) mostrarWinner();
    requestAnimationFrame(loop);
  }
}

crearEnemigos();
loop();
