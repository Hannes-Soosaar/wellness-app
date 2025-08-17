import { getUserId } from "./verificationController";
import { RequestHandler, Request, Response } from "express";
import { ResponseData } from "@shared/types/api";
import { generateUserAdvice } from "../services/ai/aiService";
//TODO: create shared interfaces for the AI
//TODO: create the API service for the out going requests to the AI service
//TODO: import the services for DB interactions

export const getAiAdvice = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = getUserId(req);

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
  } catch (error) {}
};

export const getWeeklyAdvice = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = getUserId(req);
  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }
};

export const getMonthlyAdvice = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = getUserId(req);
  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }
};
