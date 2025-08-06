import { Request, RequestHandler, Response } from "express";
import { getUserId } from "./verificationController";
import {
  ProgressPost,
  UserProgressPost,
  ResponseData,
} from "@shared/types/api";

export const getUserProgress: RequestHandler = async (
  req: Request,
  res: Response
) => {
  let response: ResponseData<null> = {
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
    // response.data = await fetchUserProgress(userId);
    response.success = true;
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
  let response: ResponseData<null> = {
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
        const userProgress: UserProgressPost = await 
        
    }catch (error) {
      response.error = "Failed to update user progress";
      res.status(500).json(response);
      return;
    }
};
