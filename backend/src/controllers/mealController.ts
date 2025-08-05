import { Request, RequestHandler, Response } from "express";
import {
  MealOptions,
  MealPost,
  ResponseData,
  UserMeal,
} from "@shared/types/api";
import { getUserId } from "./verificationController";
import {
  getActiveMealOptions,
  updateUserMeals as addMealToUserMeals,
} from "../services/user/mealService";

export const getMealOptions: RequestHandler = async (
  req: Request,
  res: Response
) => {
  console.log("userId in getMealOptions");
  let responseData: ResponseData<MealOptions> = {
    success: false,
    message: "",
  };
  const userId = getUserId(req);

  if (!userId) {
    responseData.error = "Not logged in";
    res.status(404).json(responseData);
  }

  try {
    const response = await getActiveMealOptions();
    responseData.data = response;
    responseData.success = true;
    responseData.message = "Meal options loaded successfully";
    res.status(200).json(responseData);
  } catch (error) {
    responseData.error = "Failed to load meal options";
    res.status(500).json(responseData);
  }
};

export const updateUserMeals: RequestHandler = async (
  req: Request,
  res: Response
) => {
  let responseData: ResponseData<MealPost> = {
    success: false,
    message: "",
  };

  const userId = getUserId(req);
  if (!userId) {
    responseData.error = "Not logged in";
    res.status(404).json(responseData);
  }

  const userMeal: UserMeal = { ...req.body, userId };

  try {
    await addMealToUserMeals(userMeal);
    responseData.success = true;
    responseData.message = "User meals updated successfully";
    responseData.data = req.body;
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error updating user meals", error);
    responseData.error = "Failed to update user meals";
    res.status(500).json(responseData);
  }
};
