import { Request, Response } from "express";
import { getUserId } from "./verificationController";
import {
  getUserRestrictions as getUserRestrictionsService,
  getRestrictions as getRestrictionsService,
  updateUserRestrictions as updateUserRestrictionsService,
} from "@backend/src/services/user/restrictionsService";
import {
  UserRestriction,
  RestrictionPost,
  ResponseData,
  RestrictionResponse,
  Restriction,
} from "@shared/types/api";

export const getRestrictions = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  let responseData: ResponseData<RestrictionResponse> = {
    success: false,
    message: "",
  };

  if (!userId) {
    responseData.error = "Not logged in";
    return res.status(404).json(responseData);
  }

  try {
    const [options, userRestrictions] = await Promise.all([
      getRestrictionsService(),
      getUserRestrictionsService(userId),
    ]);

    responseData.data = { options, userRestrictions };
    responseData.success = true;
    responseData.message = "Restrictions loaded successfully";
    return res.status(200).json(responseData);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to load restrictions";
    responseData.error = errorMessage;
    return res.status(500).json(responseData);
  }
};

export const updateRestrictions = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  let responseData: ResponseData<null> = {
    success: false,
    message: "",
  };

  if (!userId) {
    responseData.error = "Not logged in";
    return res.status(404).json(responseData);
  }

  const restrictions: RestrictionPost = req.body;

  try {
    // did not inline the req.boy straight to the service call to keep the code readable
    await updateUserRestrictionsService(userId, restrictions);
    responseData.success = true;
    responseData.message = "Restrictions updated successfully";
    return res.status(200).json(responseData);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update restrictions";
    responseData.error = errorMessage;
    return res.status(500).json(responseData);
  }
};
