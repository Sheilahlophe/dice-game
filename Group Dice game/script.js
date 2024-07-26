// Game state
const players = [
    { id: 'player1', color: 'yellow', position: 0 },
    { id: 'player2', color: 'red', position: 0 },
    { id: 'player3', color: 'green', position: 0 }
];
let currentPlayerIndex = 0;
const winningPosition = 95; // Percentage of the board width

// DOM elements
const rollButton = document.getElementById('rollButton');
const gameStatus = document.getElementById('gameStatus');
const dice = document.querySelector('.dice');

/**
 * Roll the dice and move the current player
 */
function rollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;
    const rotations = {
        1: 'rotateX(0deg) rotateY(0deg)',
        2: 'rotateX(-90deg) rotateY(0deg)',
        3: 'rotateX(0deg) rotateY(-90deg)',
        4: 'rotateX(0deg) rotateY(90deg)',
        5: 'rotateX(90deg) rotateY(0deg)',
        6: 'rotateX(180deg) rotateY(0deg)'
    };
    
    dice.style.transform = rotations[roll];
    
    const currentPlayer = players[currentPlayerIndex];
    currentPlayer.position += roll * 5; // Each roll moves 5% of the board width
    
    if (currentPlayer.position >= winningPosition) {
        currentPlayer.position = winningPosition;
        movePlayer(currentPlayer);
        endGame(currentPlayer);
    } else {
        movePlayer(currentPlayer);
        gameStatus.textContent = `${currentPlayer.color.charAt(0).toUpperCase() + currentPlayer.color.slice(1)} player rolled a ${roll}`;
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    }
}
// Move player function
function movePlayer(playerId, steps) {
    const player = players[playerId];
    player.position += steps;
    player.score += steps;
    if (player.position > winningPosition) {
        player.position = winningPosition;
    }
    playerElements[playerId].style.left = `${(player.position / winningPosition) * 90}%`;
    scoreElements[playerId].textContent = player.score;
}

// Check win condition
function checkWin(playerId) {
    if (players[playerId].position >= winningPosition) {
        alert(`Player ${playerId + 1} wins!`);
        rollButton.disabled = true;
    }
}

// Game turn
function gameTurn() {
    const roll = rollDice();
    movePlayer(currentPlayer, roll);
    checkWin(currentPlayer);
    currentPlayer = (currentPlayer + 1) % 3;
}

/**
 * Move the player on the board
 * @param {Object} player - The player object to move
 */
function movePlayer(player) {
    const playerElement = document.getElementById(player.id);
    playerElement.style.left = `${player.position + 5}%`;
}

/**
 * End the game and display the winner
 * @param {Object} winner - The winning player object
 */
function endGame(winner) {
    gameStatus.textContent = `${winner.color.charAt(0).toUpperCase() + winner.color.slice(1)} player wins!`;
    rollButton.disabled = true;
}

// Event listener for the roll button
rollButton.addEventListener('click', gameTurn);

