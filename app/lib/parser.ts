const fs = require("fs");
const path = require("path");
const folder = "public/generated/";

export default function createFilesFroImnput(rawInput: string) {
  // replace errant "html" strings
  // const input = rawInput.replace(/```/g, "").replace(/html/g, "");
  console.log(rawInput);
  const input = rawInput.split("|||")[1];

  const filePattern = /\[create-(.+?)\]\n([\s\S]+?)(?=\n\[create-|$)/g;
  let match;

  console.log("creating files from input");

  while ((match = filePattern.exec(input)) !== null) {
    const fileName = match[1];
    let fileContent = match[2];

    // Remove unwanted strings from the file content
    fileContent = fileContent
      .replace(/```html/g, "")
      .replace(/```css/g, "")
      .replace(/```js/g, "");

    fileContent = fileContent.replace(/```/g, "");

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
