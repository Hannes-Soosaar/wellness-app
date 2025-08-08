import { Request, Response } from "express";
import { getUserId } from "./verificationController";
import {
  getUserRestrictions as getUserRestrictionsService,
  getRestrictions as getRestrictionsService,
  updateUserRestrictions as updateUserRestrictionsService,
} from "@backend/src/services/user/restrictionsService";
import {
  RestrictionPost,
  ResponseData,
  RestrictionResponse,
} from "@shared/types/api";

export const getRestrictions = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  let responseData: ResponseData<RestrictionResponse> = {
    success: false,
    message: "",
  };

  if (!userId) {
    responseData.error = "Not logged in";
    res.status(404).json(responseData);
    return;
  }

  try {
    const [options, userRestrictions] = await Promise.all([
      getRestrictionsService(),
      getUserRestrictionsService(userId),
    ]);

    responseData.data = { options, userRestrictions };
    responseData.success = true;
    responseData.message = "Restrictions loaded successfully";
    res.status(200).json(responseData);
    return;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to load restrictions";
    responseData.error = errorMessage;
    res.status(500).json(responseData);
    return;
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
    res.status(404).json(responseData);
    return;
  }

  const restrictions: RestrictionPost = req.body;

  try {
    await updateUserRestrictionsService(userId, restrictions);
    responseData.success = true;
    responseData.message = "Restrictions updated successfully";
    res.status(200).json(responseData);
    return;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update restrictions";
    responseData.error = errorMessage;
    res.status(500).json(responseData);
    return;
  }
};
