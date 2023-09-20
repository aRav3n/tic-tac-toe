const startButton = document.querySelector('#assignPlayers');

const gameBoard = (() => {
    const gameboard = document.querySelector('#gameboard');
    const row1 = [0,0,0];
    const row2 = [0,0,0];
    const row3 = [0,0,0];
    const board = [row1, row2, row3];

    function checkForWinner() {
        for (let i = 0; i < 3; i++){
            let counterX = 0;
            let counterY = 0;
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === 'X') {
                    counterX++;
                } else if (board[i][j] === 'Y') {
                    counterY++;
                };
                if (counterX === 3 || counterY === 3) {
                    for (let k = 0; k < 3; k++){
                        const string = '#gameSquare-' + i + '-' + k;
                        const square = document.querySelector(string);
                        square.classList.add('winner');
                    };
                };
            };
        };
        for (let i = 0; i < 3; i++){
            let counterX = 0;
            let counterY = 0;
            for (let j = 0; j < 3; j++) {
                if (board[j][i] === 'X') {
                    counterX++;
                } else if (board[j][i] === 'Y') {
                    counterY++;
                };
                if (counterX === 3 || counterY === 3) {
                    for (let k = 0; k < 3; k++){
                        const string = '#gameSquare-' + k + '-' + i;
                        const square = document.querySelector(string);
                        square.classList.add('winner');
                    };
                };
            };
        };
    };

    function refreshGameBoard () {
        gameboard.innerHTML = "";
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const div = document.createElement('div');
                let string = 'gameSquare-' + i + '-' + j;
                div.setAttribute('id', string);
                if (board[i][j] !== 0) {
                    div.innerHTML = board[i][j];
                } else {
                    div.innerHTML = '';
                };
                gameboard.appendChild(div);
            };
        };
        checkForWinner();
    };

    refreshGameBoard();

    return {
        board,
        refreshGameBoard,
    };
})();

const Player = (name, symbol) => {
    const board = gameBoard.board;
    const currentPlayerDisplay = document.querySelector('#playerName');

    function switchCurrentPlayer() {
        if (game.currentPlayer.symbol === 'X') {
            game.currentPlayer = playerO;
        } else if (game.currentPlayer.symbol === 'O') {
            game.currentPlayer = playerX;
        };
        currentPlayerDisplay.innerHTML = game.currentPlayer.name;
    };

    function listenForPlayerClicks() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let squareId = '#gameSquare-' + i + '-' + j;
                let square = document.querySelector(squareId);
                square.addEventListener('click', () => {
                    if (board[i][j] === 0) {
                        board[i][j] = game.currentPlayer.symbol;
                        switchCurrentPlayer();
                        gameBoard.refreshGameBoard();
                        listenForPlayerClicks();
                    };
                });
            };
        };
    };
    
    listenForPlayerClicks();

    return {
        name,
        symbol,
    };
};

const playerO = Player ('John Doe', 'O');
const playerX = Player ('John Doe', 'X');

const game = (() => {
    const board = document.querySelector('#gameboard');
    let currentPlayer = playerX;
    const currentPlayerDisplay = document.querySelector('#playerName');
    const startButton = document.querySelector('#assignPlayers');

    const buttonHide = (buttonID, objectHideID, objectRevealID) => {
        document.querySelector(buttonID).addEventListener('click', () => {
            document.querySelector(objectHideID).style.display = 'none';
            document.querySelector(objectRevealID).style.display = 'grid';
        });
    };

    const initialHide = (objectID) => {
        window.addEventListener('DOMContentLoaded', () => {
            document.querySelector(objectID).style.display = 'none';
        });
    };

    startButton.addEventListener('click', () => {
        const playerOName = document.querySelector('#O').value;
        const playerXName = document.querySelector('#X').value;
    
        playerO.name = playerOName;
        playerX.name = playerXName;

        currentPlayerDisplay.innerHTML = currentPlayer.name;
    
        return(playerO, playerX);
    });

    return {
        buttonHide,
        currentPlayer,
        initialHide,
    }
})();

game.initialHide('#playing');
game.buttonHide('#newGame', '#playing', '#notPlaying');
game.buttonHide('#assignPlayers', '#notPlaying', '#playing');