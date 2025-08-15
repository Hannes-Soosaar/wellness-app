import { Request, Response } from "express";
import { getUserId } from "./verificationController";
import {
  AssessmentOption,
  AssessmentOptions,
  UserAssessments,
  userAssessment,
  ResponseData,
  AssessmentState,
} from "@shared/types/api";
import {
  getAssessmentOptions as getAssessmentOptionsService,
  getUserAssessmentValues as getUserAssessmentValuesService,
  updateUserAssessment as updateUserAssessmentService,
} from "../services/user/assessmentService";
import { emitUserDashboardUpdate } from "../services/wsService";
export const getAssessmentOptions = async (req: Request, res: Response) => {
  const userId = getUserId(req);

  if (!userId) {
    console.log("User not logged in");
    res.status(401).json({ error: "Please log out and In, and try again" });
    return;
  }

  let responseData: ResponseData<AssessmentState> = {
    success: false,
    message: "",
  };

  try {
    const [options, userAssessments] = await Promise.all([
      getAssessmentOptionsService(),
      getUserAssessmentValuesService(userId),
    ]);

    if (!options || !userAssessments) {
    }

    responseData.data = {
      options: options,
      userAssessments: userAssessments,
    };

    responseData.success = true;
    responseData.message = "Assessment options loaded successfully";
    res.status(200).json(responseData);
    return;
  } catch (error) {
    console.error("Error fetching assessment options:", error);
    responseData.error = "Failed to fetch assessment options";
    res.status(500).json(responseData);
    return;
  }
};
export const updateUserAssessment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = getUserId(req);
  if (!userId) {
    res.status(401).json({ error: "User not authenticated" });
    return;
  }

  try {
    const userAssessments: UserAssessments = req.body;
    await updateUserAssessmentService(userId, userAssessments);
    await emitUserDashboardUpdate(userId);
    res.status(200).json({ message: "User assessment updated successfully" });
  } catch (error) {
    console.error("Error updating user assessment:", error);
    res.status(500).json({ error: "Failed to update user assessment" });
  }
};
