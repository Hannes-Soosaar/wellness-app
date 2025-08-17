import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const apiKey = process.env.AI_API_KEY;

const client = new OpenAI({
  apiKey: apiKey,
  baseURL: "https://api.scaleway.ai/v1",
});

export const getEmbedding = async (text: string): Promise<number[]> => {
  try {
    const response = await client.embeddings.create({
      model: "llama-3.3-70b-instruct",
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error("Error fetching embedding:", error);
    throw new Error("Failed to fetch embedding");
  }
};

export const generateUserAdvice = async (userData: any) => {
  const prompt = `
    You are a wellness assistant.
    Here is the user data: ${JSON.stringify(userData, null, 2)}.
    Provide concise, actionable advice in markdown.
  `;

  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instruct", // or another chat-capable model
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 300,
  });

  return response.choices[0].message.content;
};
