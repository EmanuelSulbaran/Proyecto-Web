const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;
let htmlMarkup;


let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High Score: ${highScore}`;


const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};


const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("Game Over!");
  location.reload();
};


const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  }
};


const snakePartSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
    <rect x="0" y="0" width="20" height="20" rx="4" ry="4" fill="#4CAF50"/>
    <rect x="2" y="2" width="16" height="16" rx="3" ry="3" fill="#81C784"/>
  </svg>
`;

const encodedSnakePart = `data:image/svg+xml;base64,${btoa(snakePartSVG)}`;


const initGame = () => {
  if (gameOver) return handleGameOver();

  // Reset del HTML para esta frame
  htmlMarkup = `
    <div 
      class="food" 
      style="grid-area: ${foodY} / ${foodX};">
    </div>
  `;

  // Comer comida
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
    score++;

    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);

    scoreElement.innerHTML = `Score: ${score}`;
    highScoreElement.innerHTML = `High Score: ${highScore}`;
  }

  // Mover cuerpo
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  // Actualizar cabeza
  snakeBody[0] = [snakeX, snakeY];

  // Mover dirección
  snakeX += velocityX;
  snakeY += velocityY;

  // Detectar colisión con bordes
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  // Dibujar serpiente con SVG
  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `
      <div 
        class="snake-part" 
        style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}; 
               background-image: url('${encodedSnakePart}');
               background-size: cover;">
      </div>
    `;

    // Colisión consigo misma
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }

  playBoard.innerHTML = htmlMarkup;
};


changeFoodPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);
