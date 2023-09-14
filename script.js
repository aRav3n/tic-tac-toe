const buttonNew = document.querySelector('#newGame');
const buttonStart = document.querySelector('#assignPlayers');
const notPlayingSection = document.querySelector('#notPlaying');
const playingSection = document.querySelector('#playing');

const statusChange = (() => {
    const buttonHide = (button, objectHide, objectReveal) => {
        button.addEventListener('click', () => {
            objectHide.style.display = 'none';
            objectReveal.style.display = 'block';
        });
    };

    const initialHide = (object) => {
        window.addEventListener('DOMContentLoaded', () => {
            object.style.display = 'none';
        });
    };

    return {
        buttonHide,
        initialHide,
    }
})();

statusChange.initialHide(playingSection);
statusChange.buttonHide(buttonNew, playingSection, notPlayingSection);
statusChange.buttonHide(buttonStart, notPlayingSection, playingSection);