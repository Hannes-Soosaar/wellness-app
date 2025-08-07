import { Router } from "express";
import {
  getUserSettings,
  handleUser,
  updateUserSettings,
} from "../controllers/userController";
import { test } from "../controllers/authController";
import {
  getActivityOptions,
  updateUserActivity,
} from "../controllers/activityController";
import {
  getUserDashboard,
  updateProfile,
} from "../controllers/profileController";

import { getMealOptions, updateUserMeals } from "../controllers/mealController";
import {
  getUserProgress,
  updateUserProgress,
} from "../controllers/progressController";

import {
  getRestrictions,
  updateRestrictions,
} from "@backend/src/controllers/restrictionsController";

/* 
All routes here require that the user be authenticated. each page on the front end has its ons section
user services will be broken up into sections for each page.
*/

const userRouter = Router();

// User session handling routes
userRouter.get("/user", handleUser);
userRouter.get("/refresh-token", handleUser);
userRouter.get("/dashboard", test); // Get the information for a simple dashboard

//Activity page
userRouter.get("/activity/options", getActivityOptions);
userRouter.get("/activity/history", test); // Implement v2
userRouter.delete("/activity/remove", test); // Implement v2
userRouter.post("/activity", updateUserActivity);

//Settings page
userRouter.get("/settings", getUserSettings); // Get user settings
userRouter.post("/settings", updateUserSettings); // update user settings

//Meal page
userRouter.get("/meal/options", getMealOptions); // Get meal options
userRouter.get("/meal/history", test); // implement v2
userRouter.delete("/meal/remove", test); // implement v2
userRouter.post("/meal", updateUserMeals);

//Goal page
userRouter.get("/goals/options", test);
userRouter.put("/goal", test); // The goals is static, so it will overwrite the goals

//Assessment page
userRouter.get("/assessment/options", test);
userRouter.post("/assessment", test); // will update the assessment, not post as there is but one record for each profile

//Profile page
userRouter.get("/profile/dashboard", getUserDashboard);
userRouter.post("/profile", updateProfile); // will update the profile, not post as there is but one record for each profile

//Progress page
userRouter.get("/progress", getUserProgress);
userRouter.get("/progress/history", test);
userRouter.delete("/progress/remove", test);
userRouter.post("/progress", updateUserProgress);

//Restrictions page
userRouter.get("/restrictions", getRestrictions);
userRouter.post("/restrictions", updateRestrictions);

// AI routes to get advice
userRouter.get("/advice/daily", test);
userRouter.get("/advice/weekly", test);
userRouter.get("/advice/monthly", test);
userRouter.get("/advice/goal", test);

//Overview page

/* 
Decide what graphs are needed and add routes based on it
*/

export default userRouter;
