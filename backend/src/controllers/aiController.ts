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
