import { Router } from "express";
import { handleLogin } from "../controllers/loginController";
import { handleRegister } from "../controllers/registrationController";
import { handleIsUser } from "../controllers/userController"; // Ensure isUserAuthenticated is a valid middleware
import {
  handleChangePassword,
  test,
} from "@backend/src/controllers/authController";
import { handleVerifyMfa } from "../controllers/mfaController"; // Ensure MFA verification is handled correctly
import {
  getActivityHistory,
  getActivityPeriodSummary,
} from "../controllers/activityController";
import { getProgressHistory } from "../controllers/progressController";
const apiRouter = Router();

apiRouter.post("/login", handleLogin);
apiRouter.post("/login/mfa", handleVerifyMfa);
apiRouter.post("/register", handleRegister);
apiRouter.post("/reset", handleChangePassword); // not in use?
// apiRouter.post("/user", handleIsUser);

apiRouter.get("/activity/history", getActivityHistory);
//TODO: add the correct endpoint for activity summary
apiRouter.get("/activity/summary", getActivityPeriodSummary); // get this for the dashboard
apiRouter.get("/progress/history", getProgressHistory); // for graphs
apiRouter.get("/progress/summary", test); //  for Dashboard

apiRouter.get("/user", handleIsUser); // Ensure isUserAuthenticated is a valid middleware

export default apiRouter;
