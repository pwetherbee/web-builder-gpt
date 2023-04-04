document.addEventListener('DOMContentLoaded', () => {
    const randomNumberDisplay = document.getElementById('randomNumber');
    const randomizeButton = document.getElementById('randomizeButton');

    randomizeButton.addEventListener('click', () => {
        const randomInteger = Math.floor(Math.random() * 101);
        randomNumberDisplay.textContent = randomInteger;
    });
});
