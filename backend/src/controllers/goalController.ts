import { Request, RequestHandler, response, Response } from "express";
import { getUserId } from "./verificationController";
import { GoalData, ResponseData } from "@shared/types/api";
import {
  getGoals as getGoalsService,
  updateGoal as updateUserGoalService,
} from "@backend/src/services/user/goalService";

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
    const goalData = await getGoalsService(userId);
    if (!goalData) {
      response.message = "Error getting goal data";
      res.status(500).json(response);
      return;
    }
    response.data = goalData;
    response.success = true;
    response.message = "Goals fetched successfully";
    res.status(200).json(response);
    return;
  } catch (error) {
    console.error("Error fetching user goal:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
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
    const result = await updateUserGoalService(userId, req.body);
    res.status(200).json({ message: "Goal updated successfully" });
  } catch (error) {
    console.error("Error updating user goal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
