import {
  ProfilePost,
  ResponseData,
  UserDashboard,
  UserProfile,
} from "@shared/types/api";
import { Request, Response, RequestHandler } from "express";
import { getUserId } from "./verificationController";
import { ResolveFnOutput } from "module";
import { updateUserProfile } from "../services/user/userService";

// Would be better to add middle ware to handle no ID and no verification

interface ProfileUpdateRequest extends Request {
  body: ProfilePost;
}

export const updateProfile: RequestHandler = async (
  req: ProfileUpdateRequest,
  res: Response
) => {
  console.log("We arrived at the profile controller!");
  console.log("request body", req.body);

  let responseData: ResponseData<null> = {
    success: false,
    message: "",
  };

  const userId = getUserId(req);
  if (!userId) {
    responseData.error = "Unable to to update profile";
    res.status(401).json(responseData);
    return;
  }

  // calculate BMI and fat percentage

  const userProfile: UserProfile = { ...req.body, userId };

  try {
    const response = await updateUserProfile(userProfile);
    responseData.success = true;
    responseData.message = "Profile updated successfully";
    res.status(200).json(responseData);
  } catch (error) {
    responseData.error = "Failed to update profile";
    res.status(500).json(responseData);
  }
  res.status(200).json({ message: "Task completed" });
};

export const updateUserProgress: RequestHandler = async (
  req: Request,
  res: Response
) => {
  let responseData: ResponseData<null> = {
    success: false,
    message: "",
  };
  const userId = getUserId(req);

  if (!userId) {
    responseData.error = "Unable to to update profile";
    res.status(401).json(responseData);
    return;
  }

  res.status(200).json({ message: "Progress updated" });
};

export const getUserDashboard: RequestHandler = async (
  req: Request,
  res: Response
) => {
  let responseData: ResponseData<null> = {
    success: false,
    message: "",
  };

  const userId = getUserId(req);

  if (!userId) {
    responseData.error = "Unable to to update profile";
    res.status(401).json(responseData);
    return;
  }

  console.log("We arrived at the get dashboard controller!");
  console.log("request body", req.body);
  res.status(200).json({ message: "Dashboard data retrieved" });
};
