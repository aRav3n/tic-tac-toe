const game = (() => {
    let currentPlayer = 'X';
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

    return {
        buttonHide,
        initialHide,
        currentPlayer
    }
})();

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

const Player = (symbol) => {
    const board = gameBoard.board;
    const button = document.querySelector('#assignPlayers');
    let textField = document.getElementById(symbol);
    let name = 'John Doe';
    button.addEventListener('click', () => {
        name = textField.value;
        textField.value = "";
    });
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
    }
};

game.initialHide('#playing');
game.buttonHide('#newGame', '#playing', '#notPlaying');
game.buttonHide('#assignPlayers', '#notPlaying', '#playing');

const playerX = Player('X');
const playerO = Player('O');