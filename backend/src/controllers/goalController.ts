import { Request, RequestHandler, response, Response } from "express";
import { getUserId } from "./verificationController";
import { GoalData, ResponseData } from "@shared/types/api";

export const getGoals = async (req: Request, res: Response): Promise<void> => {
  const response: ResponseData<GoalData> = {
    success: false,
    message: "",
  };

  const userId = getUserId(req);
  if (!userId) {
    res.status(401).json(response);
    return;
  }

  try {
    // Fetch user goals from the database

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching user goal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserGoal = async (
  req: Request,
  res: Response
): Promise<void> => {
  const response: ResponseData<null> = {
    success: false,
    message: "",
  };

  const userId = getUserId(req);

  if (!userId) {
    res.status(401).json(response);
    return;
  }

  try {
    const goalData = req.body;
    // await updateUserGoalService(userId, goalData);
    res.status(200).json({ message: "Goal updated successfully" });
  } catch (error) {
    console.error("Error updating user goal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
