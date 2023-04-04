// pages/api/generated/[file].js
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<String>
) {
  const { file } = req.query;

  let contentType: any;
  switch (file) {
    case "index.html":
      contentType = "text/html";
      break;
    case "styles.css":
      contentType = "text/css";
      break;
    case "scripts.js":
      contentType = "text/javascript";
      break;
    default:
      res.status(404).send("File not found");
      return;
  }

  const filePath = path.join(process.cwd(), "pages", "api", "generated", file);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }

    res.setHeader("Content-Type", contentType);
    res.status(200).send(data);
  });
}
