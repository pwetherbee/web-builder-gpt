const fs = require("fs-extra");
const path = require("path");
const { exec } = require("child_process");

const input = `

`;

const folder = "demo2/";

function execute(command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

function createFilesFromInput(input) {
  const filePattern = /\[create-(.+?)\]\n([\s\S]+?)(?=\n\[create-|$)/g;
  const execPattern = /\[execute\$(.+?)\]/g;
  let match;

  while ((match = filePattern.exec(input)) !== null) {
    const fileName = match[1];
    const fileContent = match[2];

    // Prepend the folder path to the file name
    const filePath = folder + fileName;

    // Extract the directory path and create the directory if it doesn't exist
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFile(filePath, fileContent, (err) => {
      if (err) throw err;
      console.log(`Created ${filePath}`);
    });
  }

  while ((match = execPattern.exec(input)) !== null) {
    const command = match[1];
    execute(command);
  }
}

createFilesFromInput(input);
