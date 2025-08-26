import { AiRequestContent } from "../src/models/aiModels";

// give sex
// give ProgressDataPoints
// give ActivityData Points
// no name jus userID
// give todays date
// give the last 365 days of data
// give give the time frame
// give a list of items off any suggestions

// create persona

// give example of the data you need backend

// header
// data
// example
// query

// summarize
// for next perioe

export const generateDataForGoalAdvice = (userid: string): string => {
  // Get User Profile
  //Get User Goal
  // Get Goal history
  // Get User Activity History

  return "";
};
export const generateDataForWeeklyAdvice = (userid: string): string => {
  // Get User Profile
  //Get User Goal
  // Get Goal history
  // Get User Activity History
  return "";
};
export const generateDataForDailyAdvice = (userid: string): string => {
  // Get User Profile
  //Get User Goal
  // Get Goal history
  // Get User Activity History
  return "";
};
export const generateDataForMonthlyAdvice = (userid: string): string => {
  try {
    const userData = generateBaseUserData(userid);
  } catch (error) {}
  //Get User Goal
  // Get Goal history
  // Get User Activity History
  return "";
};

export const generateBaseUserData = async (userid: string): Promise<string> => {
  try {
    // Get User Profile
    //Get User Goal
    // Get Goal history
    // Get User Activity History
  } catch (error) {}

  return "";
};

let today = new Date();
let pastDate = new Date();
pastDate.setDate(today.getDate() - 30); // standard 30 day back

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
`;

const formattingGuidelines = `
  - Use markdown formatting.
  - Use headings, subheadings, bullet points, and numbered lists to organize the information.
  - Use bold and italics to emphasize important points.
  - Include relevant emojis to make the content more engaging.
  - Ensure the content is clear, concise, and easy to understand.
`;

const personalityGuidelines = `
  - Be friendly and approachable.
  - Use a conversational tone.
  - Show empathy and understanding of the user's situation.
  - Be encouraging and motivational.
  - Avoid being overly technical or clinical.
`;

// Advice structure
const responseStructureDaily = `
  - Start with a brief summary of the user's current status and recent progress and mention the user goal if provided in two 2 sentences.
  - Provide specific advice and recommendations based on the user's data for the next day.
  - Include actionable steps the user can take to improve their health and wellness as 3 bullet points with 1-2 sentences each.
  - End with a positive and encouraging note in 1 sentences.
`;
// Advice structure Weekly
const responseStructureWeakly = `
  - Start with a brief summary of the user's current status and recent progress and mention the user goal if provided in two 2 sentences.
  - Provide specific advice and recommendations based on the user's data for the next 7 Days.
  - Include actionable steps the user can take to improve their health and wellness as 3 bullet points with 1-2 sentences each.
  - End with a positive and encouraging note in 1 sentences.
`;

// Advice structure Monthly
const responseStructureMonthly = `
  - Start with a brief summary of the user's current status and recent progress and mention the user goal if provided in two 2 sentences.
  - Provide specific advice and recommendations based on the user's data for the next 30 Days.
  - Include actionable steps the user can take to improve their health and wellness as 3 bullet points with 1-2 sentences each.
  - End with a positive and encouraging note in 1 sentences.
`;

// summary instructions add dynamic data changes here
let summaryInstructions = `
  - Summarize the user's progress between ${pastDate} and ${today}. 
  - Highlight any significant changes or achievements.
  - Suggest 2 specific tasks the user can focus on tomorrow to continue their progress.
  `;
