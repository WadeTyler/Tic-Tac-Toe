
const results = document.querySelector(".results");

const topLeft = document.querySelector(".top-left");
const topMiddle = document.querySelector(".top-middle");
const topRight = document.querySelector(".top-right");
const middleLeft = document.querySelector(".middle-left");
const middle = document.querySelector(".middle");
const middleRight = document.querySelector(".middle-right");
const bottomLeft = document.querySelector(".bottom-left");
const bottomMiddle = document.querySelector(".bottom-middle");
const bottomRight = document.querySelector(".bottom-right");

const positionButtons = [
    topLeft, topMiddle, topRight, middleLeft, middle, middleRight, bottomLeft, bottomMiddle, bottomRight,
]

var lastPlayer = 2;

// 9 Positions. 0 Represents Empty Spot, 1 represents player 1 (X), 2 represents player 2 (O)
var positions = [0, 0, 0, 0, 0, 0, 0, 0, 0,];
var playerWon = false;

const playerOneInput = document.querySelector(".player-1");
const playerTwoInput = document.querySelector(".player-2");


// Wipe the board
function resetBoard() {
    for (let i = 0; i < positionButtons.length; i++) {
        positionButtons[i].innerHTML = "";
        positions[i] = 0;
    }
    // Reset starting player to player 1.
    lastPlayer = 2;
    playerWon = false;
    results.innerHTML = "";
}

function playPosition(pos) {

    if (positions[pos] != 0 || playerWon) return;

    let displayVal = "";
    if (lastPlayer === 1) {
        displayVal = 'O';
        lastPlayer = 2;
    }
    else if (lastPlayer === 2) {
        displayVal = "X";
        lastPlayer = 1;
    }

    positions[pos] = lastPlayer;

    positionButtons[pos].innerHTML = displayVal;

    checkForWinner(pos, lastPlayer);
}

function checkForWinner(pos, lastPlayer) {

    const winningCombos = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal top-left to bottom-right
        [2, 4, 6]  // Diagonal top-right to bottom-left
    ];

    for (let combo of winningCombos) {
        const [a, b, c] = combo;

        if (positions[a] === lastPlayer && positions[b] === lastPlayer && positions[c] === lastPlayer) {
            results.innerHTML = `${lastPlayer === 2 ? `${playerTwoInput.value}` : `${playerOneInput.value}`} Won!`
            playerWon = true;
        }

        // Check if Draw
        if (positions.every(pos => pos !== 0)) {
            results.innerHTML = "Draw!";
        }
    }

}