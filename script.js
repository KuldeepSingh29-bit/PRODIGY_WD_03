const cellElements = document.querySelectorAll('[data-cell-index]');
const board = document.getElementById('gameBoard');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartBtn');
const modalRestartButton = document.getElementById('modalRestartBtn');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const themeToggleCheckbox = document.getElementById('checkbox'); // Checkbox input

const X_CLASS = 'x';
const O_CLASS = 'o';
let xTurn = true; // Player X starts first
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Start Game
startGame();

restartButton.addEventListener('click', startGame);
modalRestartButton.addEventListener('click', startGame);

// Theme Toggle Functionality
themeToggleCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
});

function startGame() {
    xTurn = true;
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayerDisplay.innerText = "X";

    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.innerText = "";
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });

    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = xTurn ? X_CLASS : O_CLASS;
    const cellIndex = [...cellElements].indexOf(cell);

    if (!gameActive || gameState[cellIndex] !== "") return;

    // Place Mark
    placeMark(cell, currentClass, cellIndex);

    // Check For Win
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        // Swap Turns
        swapTurns();
    }
}

function placeMark(cell, currentClass, index) {
    cell.classList.add(currentClass);
    cell.innerText = xTurn ? "X" : "O";
    gameState[index] = xTurn ? "X" : "O";
}

function swapTurns() {
    xTurn = !xTurn;
    currentPlayerDisplay.innerText = xTurn ? "X" : "O";
}

function checkWin(currentClass) {
    const playerSymbol = xTurn ? "X" : "O";

    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return gameState[index] === playerSymbol;
        });
    });
}

function isDraw() {
    return gameState.every(cell => {
        return cell !== "";
    });
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        winningMessageTextElement.innerText = "It's a Draw!";
    } else {
        winningMessageTextElement.innerText = `${xTurn ? "X" : "O"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}
