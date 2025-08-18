import { Request, response, Response } from "express";
import {
  getActiveActivityOptions as getActivityOptionsService,
  updateUserActivity as updateUserActivityService,
  getUserActivities as getUserActivitiesService,
  getActivityPeriodSummary as getActivityPeriodSummaryService,
} from "../services/user/activityService";

import {
  ResponseData,
  ActivityOptions,
  ActivityPost,
  UserActivity,
} from "@shared/types/api";
import { getUserId } from "./verificationController";
import { calculateCalories } from "../utils/calories";
import { get } from "http";
import {
  ActivityDataPoint,
  GraphRequest,
  PeriodSummary,
} from "@shared/types/graphs";

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
  // This is kinda pointless
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

export const getActivityHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = getUserId(req);
  let responseData: ResponseData<ActivityDataPoint[]> = {
    success: false,
    message: "",
  };
  console.log("getting activities for user:", userId);
  if (!userId) {
    responseData.error = "Not logged in";
    res.status(401).json(responseData);
    return;
  }
  console.log("Request body:", req.query);
  try {
    const activities = await getUserActivitiesService(
      userId,
      req.query as unknown as GraphRequest
    );
    if (!activities || activities.length === 0) {
      responseData.error = "No activities found for the user";
      res.status(404).json(responseData);
      return;
    }
    responseData.data = activities;
    responseData.success = true;
    responseData.message = "Activity history fetched successfully";
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching activity history:", error);
    responseData.error = "Failed to fetch activity history";
    res.status(500).json(responseData);
    return;
  }
};

export const getActivityPeriodSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = getUserId(req);
  let responseData: ResponseData<PeriodSummary> = {
    success: false,
    message: "",
  };

  if (!userId) {
    responseData.error = "Not logged in";
    res.status(401).json(responseData);
    return;
  }

  try {
    const summary = await getActivityPeriodSummaryService(userId);
    if (!summary) {
      responseData.error = "No activity data found for the user";
      res.status(404).json(responseData);
      return;
    }

    responseData.data = summary;
    responseData.success = true;
    responseData.message = "Activity period summary fetched successfully";
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching activity period summary:", error);
    responseData.error = "Failed to fetch activity period summary";
    res.status(500).json(responseData);
    return;
  }
};
