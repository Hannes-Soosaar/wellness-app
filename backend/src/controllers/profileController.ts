import {
  ProfilePost,
  ResponseData,
  UserDashboard,
  UserProfile,
} from "@shared/types/api";
import { Request, Response, RequestHandler } from "express";
import { getUserId } from "./verificationController";
import { updateUserProfile } from "../services/user/profileService";
import { calculateBodyComposition } from "../utils/bodyComposition";
import { getUserDashboard as getUserDashboardService } from "../services/user/dashboardService";
import { emitUserDashboardUpdate } from "../services/wsService";
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

  const bodyComposition = calculateBodyComposition(req.body);

  const userProfile: UserProfile = { ...req.body, userId, ...bodyComposition };

  try {
    const response = await updateUserProfile(userProfile);
    responseData.success = true;
    responseData.message = "Profile updated successfully";
    await emitUserDashboardUpdate(userId);
    res.status(200).json(responseData);
    return;
  } catch (error) {
    responseData.error = "Failed to update profile";
    res.status(500).json(responseData);
    return;
  }
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
  let responseData: ResponseData<UserDashboard> = {
    success: false,
    message: "",
  };

  const userId = getUserId(req);

  if (!userId) {
    responseData.error = "Unable to to update profile";
    res.status(401).json(responseData);
    return;
  }

  try {
    const dashboardData = await getUserDashboardService(userId);
    if (dashboardData) {
      responseData.success = true;
      responseData.message = "Dashboard data retrieved successfully";
      responseData.data = dashboardData;
      res.status(200).json(responseData);
      return;
    }
  } catch (error) {
    responseData.error = "Failed to retrieve dashboard data";
    res.status(500).json(responseData);
    return;
  }
};

//TODO implement the WS to update the dashboard
