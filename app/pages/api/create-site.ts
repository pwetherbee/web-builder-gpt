import type { NextApiRequest, NextApiResponse } from "next";
import { gptAPI } from "@/lib/api";
import { prompts } from "@/lib/prompts";
import createFilesFromInput from "@/lib/parser";
import Cache from "memory-cache";

type Data = {
  message: string;
};
let cache = new Cache.Cache();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userPrompt } = req.body;

  try {
    const response = await gptAPI.post("/chat/completions", {
      model: process.env.GPT_MODEL_ID,
      messages: [
        {
          role: "system",
          content: prompts.websiteBuilder,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    const generatedFiles = createFilesFromInput(
      response.data.choices[0].message.content
    );

    console.log("generatedFiles", generatedFiles);

    cache.put("generatedFiles", generatedFiles);
    console.log("Cache after putting generatedFiles:", cache.exportJson());

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error } as Data);
  }
}

export function getGeneratedFiles() {
  const generatedFiles = cache.get("generatedFiles");
  if (!generatedFiles) {
    throw new Error("No generated files found");
  }
  return cache.get("generatedFiles");
}
