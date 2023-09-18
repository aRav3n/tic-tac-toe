const startButton = document.querySelector('#assignPlayers');

const gameBoard = (() => {
    const gameboard = document.querySelector('#gameboard');
    const row1 = [0,0,0];
    const row2 = [0,0,0];
    const row3 = [0,0,0];
    const board = [row1, row2, row3];

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

    return {
        board,
    };
})();

const Player = (name, symbol) => {
    const board = gameBoard.board;
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let squareId = '#gameSquare-' + i + '-' + j;
            let square = document.querySelector(squareId);
            square.addEventListener('click', () => {
                if (board[i][j] === 0) {
                    board[i][j] = symbol;
                } else {
                    console.log('invalid play, spot ' + i + ', ' + j + ' value is ' + board[i][j]);
                };
            });
        };
    };

    return {
        name,
        symbol,
    };
};

const playerO = Player ('John Doe', 'O');
const playerX = Player ('John Doe', 'X');

const game = (() => {
    let currentPlayer = playerX;
    const gameboard = document.querySelector('#gameboard');
    const startButton = document.querySelector('#assignPlayers');
    gameboard.addEventListener('click', () => {
        let counter = 0;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (gameBoard.board[i][j] !== 0) {
                    counter++;
                };
            };
        };
        if (counter%2 === 1) {
            currentPlayer = playerO;
            updateCurrentPlayerDisplay(currentPlayer);
        } else {
            currentPlayer = playerX;
            updateCurrentPlayerDisplay(currentPlayer);
        };

    });

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

    function updateCurrentPlayerDisplay(player) {
        const currentPlayerDisplay = document.querySelector('#playerName');
        currentPlayerDisplay.innerHTML = player.name;
    };

    startButton.addEventListener('click', () => {
        const playerOName = document.querySelector('#O').value;
        const playerXName = document.querySelector('#X').value;
    
        playerO.name = playerOName;
        playerX.name = playerXName;
    
        return(playerO, playerX);
    });

    return {
        buttonHide,
        initialHide,
        currentPlayer,
        updateCurrentPlayerDisplay
    }
})();

game.initialHide('#playing');
game.buttonHide('#newGame', '#playing', '#notPlaying');
game.buttonHide('#assignPlayers', '#notPlaying', '#playing');