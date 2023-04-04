document.addEventListener('DOMContentLoaded', function() {
  const randomizeButton = document.getElementById('randomize-button');

  randomizeButton.addEventListener('click', function() {
    const randomNumber = Math.floor(Math.random() * 1000);
    document.getElementById('random-result').innerHTML = randomNumber;
  });
});