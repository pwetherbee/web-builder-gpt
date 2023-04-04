import type { NextApiRequest, NextApiResponse } from "next";
import { getGeneratedFiles } from "./create-site";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fileName } = req.query;
  if (!fileName) {
    res.status(400).send("Bad request: fileName is required");
    return;
  }
  const generatedFiles = getGeneratedFiles();
  console.log(generatedFiles);
  if (fileName in generatedFiles) {
    const fileContent = generatedFiles[fileName as string];

    if (fileName.endsWith(".html")) {
      res.setHeader("Content-Type", "text/html");
    } else if (fileName.endsWith(".css")) {
      res.setHeader("Content-Type", "text/css");
    } else if (fileName.endsWith(".js")) {
      res.setHeader("Content-Type", "application/javascript");
    }

    res.status(200).send(fileContent);
  } else {
    res.status(404).send("File not found");
  }
}
