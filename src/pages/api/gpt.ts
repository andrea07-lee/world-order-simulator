// pages/api/gpt.ts
import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { countryData, userInput } = req.body;

  const prompt = `
  You are an AI geopolitical advisor.
  Current country status: ${JSON.stringify(countryData, null, 2)}
  User Question: ${userInput}
  Give a strategic, context-based answer based on the data.
  `;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4", // or gpt-3.5-turbo
      messages: [{ role: "user", content: prompt }],
    });

    res.status(200).json({ message: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "GPT API call failed." });
  }
}
