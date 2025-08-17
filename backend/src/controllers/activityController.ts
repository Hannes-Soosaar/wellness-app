import { Request, response, Response } from "express";
import {
  getActiveActivityOptions as getActivityOptionsService,
  updateUserActivity as updateUserActivityService,
} from "../services/user/activityService";

import {
  ResponseData,
  ActivityOptions,
  ActivityPost,
  UserActivity,
} from "@shared/types/api";
import { getUserId } from "./verificationController";
import { calculateCalories } from "../utils/calories";

interface ActivityRequest extends Request {
  body: ActivityPost;
}

export const getActivityOptions = async (req: Request, res: Response) => {
  // Verify user
  const userId = getUserId(req);

  let responseData: ResponseData<ActivityOptions> = {
    success: false,
    message: "",
  };

  if (!userId) {
    responseData.error = "Not logged in";
    res.status(404).json(responseData);
  }

  try {
    const response = await getActivityOptionsService();
    responseData.data = response;
    responseData.message = "";
    responseData.success = true;
    res.status(200).json(responseData);
  } catch (error) {
    console.log("error getting data", error);
    responseData.error = "Fail to load options";
    res.status(500).json(responseData);
  }
};

export const updateUserActivity = async (
  req: ActivityRequest,
  res: Response
) => {
  const userId = getUserId(req);
  let responseData: ResponseData<null> = {
    success: false,
    message: "",
  };

  if (!userId) {
    responseData.message = "Activity not added";
    res.status(401).json({ response });
    return;
  }

  const userActivity: UserActivity = { ...req.body, userId };

  try {
    const activityCalories = await calculateCalories(userActivity);
    userActivity.caloriesBurned = activityCalories;
  } catch (error) {
    console.log("error calculating calories", error);
    responseData.error = "Error adding calories";
    userActivity.caloriesBurned = 0;
  }

  try {
    const response = await updateUserActivityService(userActivity);
    responseData.message = "Activity added";
    responseData.success = true;
    res.status(200).json(responseData);
  } catch (error) {
    console.log("error updating data", error);
    responseData.error = "Fail to update user Activity";
    res.status(500).json(responseData);
  }
};
