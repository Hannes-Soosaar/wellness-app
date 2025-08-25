import { RequestHandler, Request, Response } from "express";
import { ResponseData } from "@shared/types/api";
import { generateUserAdvice } from "../services/ai/aiService";
import { getUserId } from "./verificationController";
//TODO: create shared interfaces for the AI
//TODO: create the API service for the out going requests to the AI service
//TODO: import the services for DB interactions
//TODO: add the ai from memory.
export const getAiAdvice = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = getUserId(req);
  console.log("User ID for AI advice:", userId);

  const response: ResponseData<string> = {
    success: false,
    message: "",
  };
  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }
  try {
    const advice = await generateUserAdvice(userId);
    if (advice) {
      response.success = true;
      response.data = advice;
      response.message = "AI advice generated successfully";
    }
    res.status(200).json(response);
  } catch (error) {
    console.error("Error generating AI advice:", error);
    response.error = "Failed to generate AI advice";
    res.status(500).json(response);
    return;
  }
};

export const getWeeklyAdvice = async (
  req: Request,
  res: Response
): Promise<void> => {
  const response: ResponseData<string> = {
    success: false,
    message: "",
  };
  const userId = getUserId(req);
  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  try {
    const advice = await generateUserAdvice(userId);
    if (advice) {
      response.success = true;
      response.data = advice;
      response.message = "AI advice generated successfully";
    }
    res.status(200).json(response);
    return;
  } catch (error) {
    console.error("Error generating AI advice:", error);
    response.error = "Failed to generate AI advice";
    res.status(500).json(response);
    return;
  }
};

export const getMonthlyAdvice = async (
  req: Request,
  res: Response
): Promise<void> => {
  const response: ResponseData<string> = {
    success: false,
    message: "",
  };
  const userId = getUserId(req);

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }
  try {
    const advice = await generateUserAdvice(userId);
    if (advice) {
      response.success = true;
      response.data = advice;
      response.message = "AI advice generated successfully";
    }
    res.status(200).json(response);
    return;
  } catch (error) {
    console.error("Error generating AI advice:", error);
    response.error = "Failed to generate AI advice";
    res.status(500).json(response);
    return;
  }
};



export const getAdviceController = async (req:Request, res:Response): Promise<void>  => {
  const adviceType  = req.body;


    const response: ResponseData<string> = {
      success: false,
      message: "",
    };
    const userId = getUserId(req);


  try {
    let instruction = "";
    let category = "";

    switch (adviceType) {
      case "summary":
        instruction =
          "Summarize the last 7 days of progress and suggest 2 tasks for tomorrow.";
        category = "wellness";
        break;
      case "nutrition":
        instruction =
          "Review calorie intake and give nutrition tips for tomorrow.";
        category = "nutrition";
        break;
      case "fitness":
        instruction =
          "Review exercise history and suggest a workout plan for tomorrow.";
        category = "fitness";
        break;
      default:
        return res.status(400).json({ error: "Invalid advice type" });
    }


    // Try generating advice
    let advice;
    try {
      advice = await generateAndSaveUserAdvice(
        userId,
        userData,
        instruction,
        category
      );
    } catch (err) {
      console.error(
        "AI advice generation failed, falling back to latest advice"
      );

      // fallback
      const fallbackQuery = `
        SELECT * 
        FROM user_advice ua
        JOIN advice_categories ac ON ac.id = ua.advice_category_id
        WHERE user_id = $1 AND ac.category = $2
        ORDER BY ua.created_at DESC
        LIMIT 1;
      `;
      const result = await pool.query(fallbackQuery, [userId, category]);
      advice = result.rows[0];
    }

    res.json({ advice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
