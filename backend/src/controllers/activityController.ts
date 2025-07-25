import axios from "axios";
import { Request, RequestHandler, Response } from "express";
import {
  getActiveActivityOptions as getActivityOptionsService,
  updateUserActivity as updateUserActivityService,
} from "../services/user/activityService";

import { ResponseData, ActivityOptions } from "@shared/types/api";
import { handleIsUser } from "./userController";
import { getUserId } from "./verificationController";

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

export const updateUserActivity = async (req: Request, res: Response) => {
  const userId = getUserId(req);

  let responseData: ResponseData<null> = {
    success: false,
    message: "",
  };

  if (!userId) {
    responseData.error = "Not logged in";
    res.status(404).json(responseData);
  }

  try {
    const response = await updateUserActivityService(userId);
    responseData.message = "Activity added";
    responseData.success = true;
    res.status(200).json(responseData);
  } catch (error) {
    console.log("error updating data", error);
    responseData.error = "Fail to update user Activity";
    res.status(500).json(responseData);
  }
};
