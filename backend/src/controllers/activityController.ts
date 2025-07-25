import axios from "axios";
import { Request, RequestHandler, Response } from "express";

import { ResponseData, ActivityOptions } from "@shared/types/api";
import { handleIsUser } from "./userController";

export const getActivityOptions = (req: Request, res: Response) => {
  // Verify user
  handleIsUser(req, res);

  try {
    const response = await getOptions;
  } catch (error) {}
};

export const updateUserActivity = (req: Request, res: Response) => {};
