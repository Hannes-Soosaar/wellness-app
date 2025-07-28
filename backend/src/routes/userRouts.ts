import { Router } from "express";
import { handleUser } from "../controllers/userController";
import { test } from "../controllers/authController";
import {
  getActivityOptions,
  updateUserActivity,
} from "../controllers/activityController";

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

//Meal page
userRouter.get("/meal/options", test);
userRouter.get("/meal/history", test); // implement v2
userRouter.delete("/meal/remove", test); // implement v2
userRouter.post("/meal", test);

//Goal page
userRouter.get("/goals/options", test);
userRouter.put("/goal", test); // The goals is static, so it will overwrite the goals

//Assessment page
userRouter.get("/assessment/options", test);
userRouter.put("/assessment", test); // will update the assessment, not post as there is but one record for each profile

//Profile page
userRouter.get("/profile/options", test);
userRouter.put("/profile", test); // will update the profile, not post as there is but one record for each profile

//Progress page
userRouter.get("/progress/options", test);
userRouter.get("/progress/history", test);
userRouter.delete("/progress/remove", test);
userRouter.post("/progress", test);

//Restrictions page
userRouter.get("/restrictions/options", test);
userRouter.put("/restrictions", test);

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
