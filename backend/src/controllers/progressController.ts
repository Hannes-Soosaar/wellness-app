import { Request, RequestHandler, Response } from "express";
import { getUserId } from "./verificationController";
import {
  ProgressPost,
  UserProgressPost,
  ResponseData,
} from "@shared/types/api";
import { GraphRequest, ProgressDataPoint } from "@shared/types/graphs";
import {
  getLastUserProgress as getUserProgressService,
  updateUserProgress as updateUserProgressService,
} from "@backend/src/services/user/progressService";
import { getSexAndHeightByUserId } from "@backend/src/services/user/userService";
import { calculateBodyCompositionGeneric } from "../utils/bodyComposition";
import { BodyComposition } from "@shared/types/data";
import { emit } from "process";
import { emitUserDashboardUpdate } from "../services/wsService";
import { getUserProgressHistory } from "@backend/src/services/user/progressService";

export const getLastUserProgress: RequestHandler = async (
  req: Request,
  res: Response
) => {
  let response: ResponseData<ProgressPost> = {
    success: false,
    message: "",
  };
  const userId = getUserId(req);
  console.log("User ID in getLastUserProgress:", userId);

  if (!userId) {
    response.error = "Not logged in";
    res.status(401).json(response);
    return;
  }

  try {
    // Fetch user progress from the database (not implemented here)
    const userProgress = await getUserProgressService(userId);
    response.success = true;
    response.data = userProgress;
    response.message = "User progress loaded successfully";
    res.status(200).json(response);
  } catch (error) {
    console.error("Error loading user progress", error);
    response.error = "Failed to load user progress";
    res.status(500).json(response);
  }
};

export const updateUserProgress: RequestHandler = async (
  req: Request,
  res: Response
) => {
  let response: ResponseData<ProgressPost> = {
    success: false,
    message: "",
  };

  let userBodyComposition: BodyComposition = {
    BMI: 0,
    fatPercentage: 0,
  };

  console.log("User ID in updateUserProgress:", req.body.userId);

  const userId = getUserId(req);

  if (!userId) {
    response.error = "Not logged in";
    res.status(401).json(response);
    return;
  }

  console.log("User progress data:", req.body);

  try {
    const sexAndHeight = await getSexAndHeightByUserId(userId);
    const userSex = sexAndHeight.sex;
    const userHeight = sexAndHeight.height;
    console.log("parameters that are newly calculated", userSex, userHeight);

    userBodyComposition = calculateBodyCompositionGeneric(
      req.body.weight,
      userHeight,
      req.body.waistCircumference,
      req.body.neckCircumference,
      userSex,
      req.body.hipCircumference
    );
    emitUserDashboardUpdate(userId);
  } catch (error) {
    // TODO: the error handling is not very good here, it should be improved
    console.log("Failed to calculate body composition", error);
    response.error = "failed to update user progress" + error;
    res.status(500).json(response);
    return;
  }

  try {
    console.log("the ");
    const updateResponse = await updateUserProgressService(
      userId,
      req.body as ProgressPost,
      userBodyComposition
    );
    response.success = true;
    response.message = "User progress updated successfully";
    // This is a  rotten dirty trick, it just mirrors the input back
    response.data = req.body;
    res.status(200).json(response);
    return;
  } catch (error) {
    console.error("Error updating user progress", error);
    response.error = "Failed to update user progress";
    res.status(500).json(response);
    return;
  }
};

export const getProgressHistory: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  let response: ResponseData<ProgressDataPoint[]> = {
    success: false,
    message: "",
  };

  const userId = getUserId(req);
  console.log("User ID in getProgressHistory:", userId);
  console.log("Request query parameters:", req.query);

  if (!userId) {
    response.error = "Not logged in";
    res.status(401).json(response);
    return;
  }

  try {
    const progressHistory = await getUserProgressHistory(
      userId,
      req.query as unknown as GraphRequest
    );
    if (!progressHistory || progressHistory.length === 0) {
      response.error = "No progress history found for the user";
      res.status(404).json(response);
      return;
    }
    console.log("Progress history fetched successfully:", progressHistory);
    response.success = true;
    response.data = progressHistory;
    response.message = "User progress history loaded successfully";
    res.status(200).json(response);
  } catch (error) {
    console.error("Error loading user progress history", error);
    response.error = "Failed to load user progress history";
    res.status(500).json(response);
  }
};
