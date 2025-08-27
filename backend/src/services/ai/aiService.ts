import dotenv from "dotenv";
import OpenAI from "openai";
import { AiRequestContent } from "../../models/aiModels";
import { pool } from "@backend/server";

dotenv.config();

const apiKey = process.env.SCW_SECRET_KEY;

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

const SIMULATE_AI_OFFLINE = true; // set true to test memory

export const generateUserAdvice = async (requestContent: AiRequestContent) => {
  console.log("Generating advice for user data:", requestContent.userPrompt);
  if (SIMULATE_AI_OFFLINE) {
    throw new Error("Simulating AI service offline");
  }
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instruct",
      messages: [
        { role: "system", content: requestContent.systemMessage },
        { role: "user", content: requestContent.userPrompt },
      ],
      temperature: 0.7,
      max_tokens: requestContent.tokens || 500,
    });
    const advice = response.choices[0].message.content;
    console.log("AI response:", advice);
    return advice;
  } catch (error) {
    console.error("Error generating advice:", error);
    throw new Error("Failed to generate advice");
  }
};

export const saveAiAdvice = async (
  userId: string,
  advice: string, // response from AI
  prompt: AiRequestContent,
  type: string // original user request content
): Promise<void> => {
  console.log("Saving advice for user:", userId);
  console.log("Advice content:", advice);
  console.log("Prompt content:", prompt);
  console.log("Category:", type);
  try {
    console.log("Saving AI advice to database for user:", userId);
    const response = await pool.query(
      `
    INSERT INTO user_advice (user_id, advice_markdown, advice_category, user_input)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
      [userId, advice, type, prompt]
    );
    console.log("AI advice saved successfully for user:", userId);
  } catch (error) {
    console.error("Error saving AI advice:", error);
    throw new Error("Failed to save AI advice");
  }
};

export const getSavedAdvice = async (
  userId: string,
  type: string
): Promise<string> => {
  try {
    const response = await pool.query(
      `
    SELECT advice_markdown FROM user_advice
    WHERE user_id = $1 AND advice_category = $2
    ORDER BY created_at DESC
    LIMIT 1
    `,
      [userId, type]
    );
    if (response.rows.length === 0) {
      throw new Error("No advice found for the user in this category");
    }
    return response.rows[0].advice_markdown;
  } catch (error) {
    console.error("Error fetching saved AI advice:", error);
    throw new Error("Failed to fetch saved AI advice");
  }
};
