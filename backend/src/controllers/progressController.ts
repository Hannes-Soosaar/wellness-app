import { Request, RequestHandler, Response } from "express";
import { getUserId } from "./verificationController";
import {
  ProgressPost,
  UserProgressPost,
  ResponseData,
} from "@shared/types/api";

import {
  getLastUserProgress as getUserProgressService,
  updateUserProgress as updateUserProgressService,
} from "@backend/src/services/user/progressService";
import { getSexAndHeightByUserId } from "@backend/src/services/user/userService";
import { calculateBodyCompositionGeneric } from "../utils/bodyComposition";
import { BodyComposition } from "@shared/types/data";

export const getLastUserProgress: RequestHandler = async (
  req: Request,
  res: Response
) => {
  let response: ResponseData<ProgressPost> = {
    success: false,
    message: "",
  };
  const userId = getUserId(req);

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

  const userId = getUserId(req);

  if (!userId) {
    response.error = "Not logged in";
    res.status(401).json(response);
    return;
  }

  try {
    const sexAndHeight = await getSexAndHeightByUserId(userId);
    const userSex = sexAndHeight.sex;
    const userHeight = sexAndHeight.height;
    userBodyComposition = calculateBodyCompositionGeneric(
      req.body.weight,
      req.body.neckCircumference,
      req.body.waistCircumference,
      req.body.hipCircumference,
      userSex,
      userHeight
    );
  } catch (error) {
    response.error = "Failed to get user sex and height";
    res.status(500).json(response);
    return;
  }

  try {
    const updateResponse = await updateUserProgressService(
      req.body as UserProgressPost,
      userBodyComposition
    );
    response.success = true;
    response.message = "User progress updated successfully";
    // This is a  rotten dirty trick, it just mirrors the input back
    response.data = req.body;
    res.status(200).json(response);
    return;
  } catch (error) {
    response.error = "Failed to update user progress";
    res.status(500).json(response);
    return;
  }
};
