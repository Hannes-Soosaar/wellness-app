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
import { getAssessmentOptions as getAssessmentOptionsService } from "../services/user/assessmentService";

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
    const options = await getAssessmentOptionsService();
    responseData.success = true;
    responseData.data?.options = options;
    responseData.data?.o = options;
    responseData.message = "Assessment options loaded successfully";
    res.status(200).json(responseData);
  } catch (error) {}
};
