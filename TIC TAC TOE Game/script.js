// script.js
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status p');
const resetButton = document.getElementById('reset-btn');

let board = ['', '', '', '', '', '', '', '', ''];  // Tracks the game state
let currentPlayer = 'X';  // Starting player
let gameOver = false;

// Function to handle cell click
function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-cell');
    
    if (board[cellIndex] !== '' || gameOver) return;  // Ignore if cell is already filled or game is over
    
    // Mark the cell with the current player's symbol
    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer.toLowerCase()); // Add X or O class for styling
    
    // Check for a winner or draw
    if (checkWinner(currentPlayer)) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        statusText.classList.add('win');
        gameOver = true;
    } else if (board.every(cell => cell !== '')) {
        statusText.textContent = "It's a draw!";
        statusText.classList.add('tie');
        gameOver = true;
    } else {
        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Function to check if a player has won
function checkWinner(player) {
    const winningCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombination.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    statusText.classList.remove('win', 'loss', 'tie');
}

// Add event listeners to the cells
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Add reset game functionality
resetButton.addEventListener('click', resetGame);
