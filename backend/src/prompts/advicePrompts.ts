import { AiRequestData } from "@shared/types/ai";
import { AiRequestContent, UserPromptData } from "../models/aiModels";

import { getUserDataForPrompt } from "../services/ai/adviceService";

export const generatePrompt = async (
  userId: string,
  userRequestData: AiRequestData
): Promise<AiRequestContent> => {
  let userRequestParams: AiRequestData = userRequestData || {};

  if (!userId) {
    throw new Error("User ID is required to generate prompt");
    ``;
  }
  const today = new Date();
  const pastDate = new Date();

  if (userRequestData.from === "" || userRequestData.to === "") {
    pastDate.setDate(today.getDate() - 30); // standard 30 day back
    userRequestParams.from = pastDate.toISOString().split("T")[0];
    userRequestParams.to = today.toISOString().split("T")[0];
  }

  let userData: UserPromptData;

  try {
    userData = await getUserDataForPrompt(
      userId,
      userRequestParams.from || "",
      userRequestParams.to || ""
    );
  } catch (error) {
    throw new Error("Failed to fetch user data for prompt");
  }

  const rollGuidelines = `
- You are a health and wellness coach AI specialized in providing personalized advice based on user data.
- Your goal is to help users improve their health and wellness by providing actionable following formatting guidelines provided.
- You should use the user's data to tailor your advice to their specific situation, goals, and progress.
- You should avoid generic advice and focus on specific recommendations that are relevant to the user's data.
- You should be empathetic and encouraging, and avoid being overly technical.
- You should respect the user's privacy and avoid asking for personal information, such as name, email, or other identifiers.
- You should avoid making assumptions about the user's lifestyle, preferences, or abilities.
- You should always consider any health restrictions the user has mentioned and ensure your advice is safe and appropriate.
- You should not provide medical advice or diagnose health conditions.
- You should always encourage users to consult with a healthcare professional for medical concerns.
- You will not request or store any personal identifiers such as name, email, or contact info.
- You will focus only on anonymized wellness data provided.
`;

  let prompt: string = "";

  const formattingGuidelines = `
    Formatting:
  - Use markdown formatting.
  - Use headings, subheadings, bullet points, and numbered lists to organize the information.
  - Use bold and italics to emphasize important points.
  - Include relevant emojis to make the content more engaging.
  - Ensure the content is clear, concise, and easy to understand.
  - All input is in SI units kg, cm, meters, kilometers, Celsius, kcal, and time in Minutes.
  - All responses and suggestions should also be in SI units  kg, cm, meters, kilometers, Celsius, kcal, and time in Minutes.
`;
  prompt += formattingGuidelines;

  const personalityGuidelines = `
  Personality:
  - Be friendly and approachable.
  - Use a conversational tone.
  - Show empathy and understanding of the user's situation.
  - Be encouraging and motivational.
  - Avoid being overly technical or clinical.
`;
  prompt += personalityGuidelines;

  // Advice structure
  const responseStructureDaily = `
- Start with a concise summary of the user's recent progress if set, highlighting trends, achievements, and how close they are to their goal (2-3 sentences).
- Provide specific advice and recommendations for the next day based on their current data and goals. Today is ${today.toISOString().split("T")[0]}.
- Include 3 actionable steps they can take to improve their health and wellness over the next month, with 1-2 sentences per step.
- End with a motivating and encouraging note.
`;
  // Advice structure Weekly
  const responseStructureWeakly = `
- Start with a concise summary of the user's recent progress if set , highlighting trends, achievements, and how close they are to their goal (2-3 sentences).
- Provide specific advice and recommendations for the next 7 days based on their current data and goals. Today is ${today.toISOString().split("T")[0]}.
- Include 3 actionable steps they can take to improve their health and wellness over the next month, with 1-2 sentences per step.
- End with a motivating and encouraging note.
`;

  // Advice structure Monthly
  const responseStructureMonthly = `
- Start with a concise summary of the user's recent progress if set, highlighting trends, achievements, and how close they are to their goal (2-3 sentences).
- Provide specific advice and recommendations for the next 30 days based on their current data and goals. Today is ${today.toISOString().split("T")[0]}.
- Include 3 actionable steps they can take to improve their health and wellness over the next month, with 1-2 sentences per step.
- End with a motivating and encouraging note.
`;

  // summary instructions add dynamic data changes here
  let summaryInstructions: string = "";

  switch (userRequestParams.type) {
    case "daily-advice":
      prompt += responseStructureDaily;
      break;
    case "weekly-advice":
      prompt += responseStructureWeakly;
      break;
    case "monthly-advice":
      prompt += responseStructureMonthly;
      break;
    case "goal-advice":
      prompt += `
- Provide specific advice and recommendations to help the user achieve their goal based on their current data and goals.
- Include 3 actionable steps they can take to improve their health and wellness over the next month, with 1-2 sentences per step.
- End with a motivating and encouraging note.
`;
      break;
    case "daily-summary":
      userRequestParams.to = today.toISOString().split("T")[0];
      summaryInstructions = `
  - Summarize the user's progress for ${userRequestParams.to}. 
  - Highlight any significant changes or achievements.
  - Suggest 2 specific tasks the user can focus on tomorrow to continue their progress.
  `;
      break;
    case "weekly-summary":
      userRequestParams.from = new Date(
        today.getTime() - 7 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0];
      userRequestParams.to = today.toISOString().split("T")[0];
      summaryInstructions = `
  - Summarize the user's progress between ${userRequestParams.from} and ${userRequestParams.to}. 
  - Highlight any significant changes or achievements.
  - Suggest 2 specific tasks the user can focus on tomorrow to continue their progress.
  `;

      prompt += summaryInstructions;
      break;
    case "monthly-summary":
      userRequestParams.from = new Date(
        today.getTime() - 30 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0];
      userRequestParams.to = today.toISOString().split("T")[0];
      summaryInstructions = `
  - Summarize the user's progress between ${userRequestParams.from} and ${userRequestParams.to}. 
  - Highlight any significant changes or achievements.
  - Suggest 2 specific tasks the user can focus on tomorrow to continue their progress.
  `;

      prompt += summaryInstructions;
      break;
    default:
      prompt += responseStructureWeakly;
      break;
  }

  prompt += `  Here is the user data: ${JSON.stringify(userData, null, 2)}
  `;

  const requestContent: AiRequestContent = {
    userPrompt: prompt,
    systemMessage: rollGuidelines,
    tokens: 500,
  };

  return requestContent;
};
