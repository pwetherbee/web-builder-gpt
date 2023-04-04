import type { NextApiRequest, NextApiResponse } from "next";
import { gptAPI } from "@/lib/api";
import { prompts } from "@/lib/prompts";
import createFilesFromInput from "@/lib/parser";

type Data = {
  message: string;
};

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
      //   prompt: "hello! what is your name?",
    });
    console.log(response.data);

    // use prompt to generate files
    // createFilesFromInput(response.data.choices[0].text);
    createFilesFromInput(response.data.choices[0].message.content);

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error } as Data);
  }
}
