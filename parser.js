const fs = require("fs-extra");
const path = require("path");
const { exec } = require("child_process");

const input = `
[create-package.json]
{
  "name": "patricks-multilingual-greetings",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
}

[create-app/pages/index.js]
import React from 'react';
import Link from 'next/link';
import '../styles/global.css';

export default function Home() {
  return (
    <>
      <nav>
        <Link href="/"><a>Home</a></Link>
        <Link href="/about"><a>About Us</a></Link>
      </nav>
      <h1>Patrick</h1>
      <div className="greetings">
        <p>Hello (English)</p>
        <p>Hola (Spanish)</p>
        <p>Bonjour (French)</p>
      </div>
    </>
  );
}

[create-app/pages/about.js]
import React from 'react';
import Link from 'next/link';
import '../styles/global.css';

export default function About() {
  return (
    <>
      <nav>
        <Link href="/"><a>Home</a></Link>
        <Link href="/about"><a>About Us</a></Link>
      </nav>
      <h1>About Us</h1>
      <div className="container">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
      </div>
    </>
  );
}

[create-app/styles/global.css]
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-image: radial-gradient(circle, #6a11cb, #2575fc);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

nav {
  position: absolute;
  top: 20px;
  right: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  margin-left: 10px;
}

nav a:hover {
  text-decoration: underline;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.greetings {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  line-height: 1.8;
}

.container {
  max-width: 600px;
  text-align: justify;
}

[execute$cd demo2 && npm install]
[execute$cd demo2 && npm run dev]
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
