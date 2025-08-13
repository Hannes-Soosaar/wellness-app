import { Request, RequestHandler, Response } from "express";
import { getUserId } from "./verificationController";

export const getGoals = async (req: Request, res: Response): Promise<void> => {
  const userId = getUserId(req);
  if (!userId) {
    res.status(401).json({ message: "User not authenticated" });
    return;
  }

  try {
    // const userGoal = await getUserGoalService(userId);
    if (!userGoal) {
      res.status(404).json({ message: "Goals not found" });
      return;
    }

    res.status(200).json(userGoal);
  } catch (error) {
    console.error("Error fetching user goal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserGoal = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = getUserId(req);
  if (!userId) {
    res.status(401).json({ message: "User not authenticated" });
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
