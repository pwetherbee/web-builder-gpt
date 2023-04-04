const fs = require("fs-extra");

const input = `
[create-index.html]
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random Integer Generator</title>
    <link rel="stylesheet" href="styles.css">
    <script src="scripts.js" defer></script>
</head>
<body>
    <div class="container">
        <div id="randomNumber" class="number-display"></div>
        <button id="randomizeButton">Randomize</button>
    </div>
</body>
</html>

[create-styles.css]
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-image: linear-gradient(to right, #6a11cb, #2575fc);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    text-align: center;
    color: white;
}

.number-display {
    font-size: 48px;
    margin-bottom: 20px;
}

#randomizeButton {
    font-size: 24px;
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    color: white;
    background-color: #1e88e5;
    transition: background-color 0.3s ease;
}

#randomizeButton:hover {
    background-color: #1976d2;
}

[create-scripts.js]
document.addEventListener('DOMContentLoaded', () => {
    const randomNumberDisplay = document.getElementById('randomNumber');
    const randomizeButton = document.getElementById('randomizeButton');

    randomizeButton.addEventListener('click', () => {
        const randomInteger = Math.floor(Math.random() * 101);
        randomNumberDisplay.textContent = randomInteger;
    });
});
`;

function createFilesFromInput(input) {
  const filePattern = /\[create-(.+?)\]\n([\s\S]+?)(?=\n\[create-|$)/g;
  let match;

  while ((match = filePattern.exec(input)) !== null) {
    const fileName = match[1];
    const fileContent = match[2];

    fs.writeFile(fileName, fileContent, (err) => {
      if (err) throw err;
      console.log(`Created ${fileName}`);
    });
  }
}

createFilesFromInput(input);
