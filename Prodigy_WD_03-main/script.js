document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const playButton = document.getElementById('playButton');
    const playComputer = document.getElementById('playComputer');
    const gameBoard = document.getElementById('gameBoard');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');
    const goBackButton = document.getElementById('goBack');

    // Game state
    let currentPlayer = 'X';
    let isGameOver = false;
    let isComputerMode = false;

    // Function to toggle visibility of the game container and hide the play buttons
    function toggleGameContainer() {
        gameContainer.classList.toggle('hidden');
        playButton.classList.toggle('hidden');
        playComputer.classList.toggle('hidden');

        if (!gameContainer.classList.contains('hidden')) {
            playButton.style.display = 'none';
            playComputer.style.display = 'none';
            resetGame();
        } else {
            playButton.style.display = 'block';
            playComputer.style.display = 'block';
        }

        if (!gameContainer.classList.contains('hidden')) {
            // If the game container is visible, initialize the game board
            initializeGameBoard();
        }
    }

    // Function to initialize the game board
    function initializeGameBoard() {
        // Clear the game board
        gameBoard.innerHTML = '';
        if (isComputerMode) {
            status.textContent = `You are player 'X' and player 'O' is computer. Press any empty box to begin the game play`;
        } else {
            status.textContent = `You are player 'X' and player 'O'. Press any empty box to begin the game play`;
        }
        status.classList.add('black-text');

        // Dynamically create cells for the game board
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }

        // Reset game state
        currentPlayer = 'X';
        isGameOver = false;
    }

    // Function to handle cell clicks
    function handleCellClick(event) {
        if (isGameOver) return;

        const clickedCell = event.target;
        if (clickedCell.textContent === '') {
            clickedCell.textContent = currentPlayer;
            clickedCell.classList.add('occupied');
            checkGameStatus();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

            // If it's computer's turn
            if (isComputerMode && currentPlayer === 'O') {
                makeComputerMove();
            }
        }
    }

    // Function to check the game status
    function checkGameStatus() {
        const cells = document.querySelectorAll('.cell');
        const cellValues = Array.from(cells).map((cell) => cell.textContent);

        // Check for a win
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (cellValues[a] && cellValues[a] === cellValues[b] && cellValues[a] === cellValues[c]) {
                isGameOver = true;
                status.textContent = `Player '${cellValues[a]}' wins!`;
                return;
            }
        }

        // Check for a draw
        if (!cellValues.includes('')) {
            isGameOver = true;
            status.textContent = "It's a draw!";
            return;
        }
    }

    // Function to make a move for the computer
    function makeComputerMove() {
        const emptyCells = document.querySelectorAll('.cell:not(.occupied)');
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const randomCell = emptyCells[randomIndex];
            randomCell.textContent = currentPlayer;
            randomCell.classList.add('occupied');
            checkGameStatus();
            currentPlayer = 'X';
        }
    }

    // Function to reset the game
    function resetGame() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.textContent = '';
            cell.classList.remove('occupied');
        });

        // Reset game state
        currentPlayer = 'X';
        isGameOver = false;
        if (isComputerMode) {
            status.textContent = `You are player 'X' and player 'O' is computer. Press any empty box to begin the game play`;
        } else {
            status.textContent = `You are player 'X' and player 'O'. Press any empty box to begin the game play`;
        }
        status.classList.add('black-text');
    }

    // Function to go back to the play buttons
    function goBack() {
        gameContainer.classList.add('hidden');
        playButton.classList.remove('hidden');
        playComputer.classList.remove('hidden');
        // letComputerPlayFirst.classList.remove('hidden');
        thankYouMessage.classList.remove('hidden');
        status.textContent = "Thank you for playing!";
    }

    // Event listener for the reset button
    resetButton.addEventListener('click', resetGame);

    function handlePlayButtonClick(computerMode) {
        isComputerMode = computerMode;
        toggleGameContainer();
    }
    
    playButton.addEventListener('click', () => handlePlayButtonClick(false));
    playComputer.addEventListener('click', () => handlePlayButtonClick(true));
    

    // Event listener for the goBack button
    goBackButton.addEventListener('click', goBack);
});
