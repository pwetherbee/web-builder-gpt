const fs = require("fs");
const path = require("path");
const folder = "public/generated/";

export default function createFilesFromInput(input: string) {
  const filePattern = /\[create-(.+?)\]\n([\s\S]+?)(?=\n\[create-|$)/g;
  let match;

  console.log("creating files from input");

  while ((match = filePattern.exec(input)) !== null) {
    const fileName = match[1];
    const fileContent = match[2];

    // Construct the full file path using the current working directory
    const filePath = path.join(process.cwd(), folder, fileName);

    // Extract the directory path and create the directory if it doesn't exist
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, fileContent, (err: any) => {
      if (err) throw err;
      console.log(`Created ${filePath}`);
    });
  }
}
