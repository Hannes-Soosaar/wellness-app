import { Request, Response } from "express";
import {
  getPushupsWalk as getPushupsWalkService,
  updatePushupsWalk as updatePushupsWalkService,
} from "../services/user/pushupWalkService";

import { ResponseData, PushupAndWalk } from "@shared/types/api";
import { getUserId } from "./verificationController";
import { updateGoal, updateGoalProgress } from "../services/user/goalService";

export const getPushupsWalk = async (req: Request, res: Response) => {
  let responseData: ResponseData<PushupAndWalk> = {
    success: false,
    message: "",
  };
  const userId = getUserId(req);

  try {
    const data = await getPushupsWalkService(userId);
    responseData.data = data;
    responseData.success = true;
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching pushups and walk data:", error);
    responseData.error = "Failed to fetch pushups and walk data";
    res.status(500).json(responseData);
  }
};

export const updatePushupsWalk = async (req: Request, res: Response) => {
  let responseData: ResponseData<null> = {
    success: false,
    message: "",
  };

  const pushupAndWalkData: PushupAndWalk = req.body;
  const userId = getUserId(req);
  console.log("User to update", userId);
  if (!userId) {
    responseData.error = "User ID is required";
    res.status(400).json(responseData);
    return;
  }

  if (!pushupAndWalkData) {
    responseData.error = "Invalid data provided";
    res.status(400).json(responseData);
    return;
  }

  try {
    await updatePushupsWalkService(userId, pushupAndWalkData);
    // const goal = await getUserGoalId(userId);
    // if (goal.Id === "") {
    //   responseData.success = true;
    //   responseData.message = "Pushups and walk data updated successfully";
    //   // await updateGoalProgress (userId, goal.Id);
    res.status(200).json(responseData);
    // }
  } catch (error) {
    console.error("Error updating pushups and walk data:", error);
    responseData.error = "Failed to update pushups and walk data";
    res.status(500).json(responseData);
  }
};
