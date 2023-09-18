const statusChange = (() => {
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
    }
})();

const gameBoard = (() => {
    const gameboard = document.querySelector('#gameboard');
    const row1 = ['','',''];
    const row2 = ['','',''];
    const row3 = ['','',''];
    const board = [row1, row2, row3];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const div = document.createElement('div');
            let string = 'gameSquare-' + i + '-' + j;
            div.setAttribute('id', string);
            div.innerHTML = board[i][j];
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
    let name;
    button.addEventListener('click', () => {
        let fieldId = "#" + symbol;
        name = document.querySelector(fieldId).value;
    });
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let squareId = '#gameSquare-' + i + '-' + j;
            let square = document.querySelector(squareId);
            square.addEventListener('click', () => {
                if (board[i][j] != "") {
                    board[i][j] = symbol;
                } else {
                    console.log('invalid play');
                };
            });
        };
    };

    return {
        name,
        symbol,
    }
};

statusChange.initialHide('#playing');
statusChange.buttonHide('#newGame', '#playing', '#notPlaying');
statusChange.buttonHide('#assignPlayers', '#notPlaying', '#playing');