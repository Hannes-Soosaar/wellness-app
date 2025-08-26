import { pool } from "@backend/server";
import { generateUserAdvice } from "./aiService";
import { UserPromptData } from "@backend/src/models/aiModels";

export const createAiAdvice = async (userId: string): Promise<void> => {
  let userData: string =
    "I have not started any training yet, and my goal is to lose weight";
  const createAiAdvice = await generateUserAdvice(userData);
  if (!createAiAdvice) {
    throw new Error("Failed to generate AI advice");
  }

  try {
    const response = await pool.query(
      `
    INSERT INTO user_advice (user_id, advice_markdown, advice_metadata, advice_category_id, user_input)
    VALUES ($1, $2, '{}'::jsonb, 1, $3)
    RETURNING *
    `,
      [userId, createAiAdvice, JSON.stringify(userData)]
    );

    const advice = response.rows[0];
    console.log("AI advice created successfully:", advice);
    return advice;
  } catch (error) {
    console.error("Error creating AI advice:", error);
    throw new Error("Failed to create AI advice");
  }
};

export const getUserDataForPrompt = async (
  userId: string
): Promise<UserPromptData> => {};
