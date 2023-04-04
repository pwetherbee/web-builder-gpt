const fs = require("fs");
const path = require("path");
const folder = "public/generated/";

export default function createFilesFromInput(input: string) {
  const filePattern = /\[create-(.+?)\]\n([\s\S]+?)(?=\n\[create-|$)/g;
  let match;

  console.log("creating files from input");

  const generatedFiles: { [key: string]: string } = {};

  while ((match = filePattern.exec(input)) !== null) {
    const fileName = match[1];
    const fileContent = match[2];

    generatedFiles[fileName] = fileContent;
  }

  return generatedFiles;
}
