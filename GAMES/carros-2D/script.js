const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ajustar canvas al tamaño dinámico
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;

// Carro principal
const carWidth = 50;
const carHeight = 90;
let carX = canvas.width / 2 - carWidth / 2;
let carY = canvas.height - carHeight - 30;

// Enemigos
let enemies = [];
const enemyWidth = 50;
const enemyHeight = 90;
const colors = ["red", "blue", "yellow", "green", "purple", "orange"];

let speed = 100;
let distance = 0;
let gameOver = false;

// Colisión
function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

// Crear enemigos
function spawnEnemy() {
  if (gameOver) return;
  const lanes = Math.floor(canvas.width / 100); // calcula carriles
  const lane = Math.floor(Math.random() * lanes);
  const x = 60 + lane * 100;
  const color = colors[Math.floor(Math.random() * colors.length)];
  enemies.push({ x: x, y: -enemyHeight, width: enemyWidth, height: enemyHeight, color: color });
}
setInterval(spawnEnemy, 1200);

// Dibujar carretera
function drawRoad() {
  ctx.fillStyle = "#555";
  ctx.fillRect(50, 0, canvas.width - 100, canvas.height);

  ctx.strokeStyle = "#fff";
  ctx.setLineDash([30, 30]);
  ctx.lineWidth = 3;

  let lanes = Math.floor((canvas.width - 100) / 100);
  for (let i = 1; i < lanes; i++) {
    ctx.beginPath();
    ctx.moveTo(50 + i * 100, 0);
    ctx.lineTo(50 + i * 100, canvas.height);
    ctx.stroke();
  }
  ctx.setLineDash([]);
}

// Carro jugador
function drawCar() {
  ctx.fillStyle = "#00ff00";
  ctx.fillRect(carX, carY, carWidth, carHeight);
}

// Carros enemigos
function drawEnemies() {
  enemies.forEach((enemy, index) => {
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    enemy.y += speed;

    // Colisión real
    if (
      checkCollision(
        { x: carX, y: carY, width: carWidth, height: carHeight },
        enemy
      )
    ) {
      endGame();
    }

    if (enemy.y > canvas.height) {
      enemies.splice(index, 1);
    }
  });
}

// Texto metros
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Distancia: " + distance + " m", 20, 30);
}

// Game Loop
function gameLoop() {
  if (gameOver) return; // congela si perdiste

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoad();
  drawCar();
  drawEnemies();
  drawScore();

  distance++;
  requestAnimationFrame(gameLoop);
}

// Controles
document.addEventListener("keydown", (e) => {
  if (gameOver) return;
  if (e.key === "ArrowLeft" && carX > 60) carX -= 100;
  if (e.key === "ArrowRight" && carX < canvas.width - 60 - carWidth) carX += 100;
  if (e.key === "ArrowUp" && carY > 0) carY -= 50;
  if (e.key === "ArrowDown" && carY < canvas.height - carHeight - 30) carY += 50;
});

// Terminar juego
function endGame() {
  gameOver = true;
  document.getElementById("gameOver").style.display = "block";
  document.getElementById("scoreText").innerText = "Llegaste a " + distance + " metros";
}

// Iniciar
gameLoop();
