const rgbText = document.getElementById("rgbText");
const boxes = [
    document.getElementById("box1"),
    document.getElementById("box2"),
    document.getElementById("box3")
];
const result = document.getElementById("result");
const newGameBtn = document.getElementById("newGame");
const scoreText = document.getElementById("scoreText");

const gameOverModal = document.getElementById("gameOverModal");
const restartBtn = document.getElementById("restartBtn");

let correctColor = "";
let score = 0;
let gameActive = true; 

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function startGame() {
    result.textContent = "";
    gameActive = true;
    correctColor = getRandomColor();
    rgbText.textContent = correctColor;

    const options = [correctColor];
    while (options.length < 3) {
        let fakeColor = getRandomColor();
        if (!options.includes(fakeColor)) {
            options.push(fakeColor);
        }
    }

    options.sort(() => Math.random() - 0.5);

    boxes.forEach((box, index) => {
        box.style.backgroundColor = options[index];
        box.style.pointerEvents = "auto";  
        box.onclick = () => {
            if (!gameActive) return; 
            if (options[index] === correctColor) {
                result.textContent = "¡Eso es todo manito! ";
                result.style.color = "green";
                score++;
                scoreText.textContent = `Puntuación: ${score}`;
                setTimeout(startGame, 800);
            } else {
                result.textContent = "¡Ese no era panita! ";
                result.style.color = "red";
                gameActive = false;

                
                gameOverModal.classList.remove("hidden");

                
                boxes.forEach(box => box.style.pointerEvents = "none");
            }
        };
    });
}

newGameBtn.onclick = () => {
    if (!gameActive) {
        
        resetGame();
    } else {
        startGame();
    }
};

restartBtn.onclick = () => {
    resetGame();
};

function resetGame() {
    score = 0;
    scoreText.textContent = `Puntuación: ${score}`;
    result.textContent = "";
    gameOverModal.classList.add("hidden");
    gameActive = true;
    startGame();
}


startGame();
