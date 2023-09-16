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
    const row2 = ['','X',''];
    const row3 = ['','','O'];
    const board = [row1, row2, row3];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const div = document.createElement('div');
            div.innerHTML = board[i][j];
            gameboard.appendChild(div);
        };
    };

    return {
        board,
    };
})();

statusChange.initialHide('#playing');
statusChange.buttonHide('#newGame', '#playing', '#notPlaying');
statusChange.buttonHide('#assignPlayers', '#notPlaying', '#playing');