// Routs that do not require authentication
// Includes login, and register

import { Router } from "express";
import { handleLogin } from "../controllers/loginController";
import { handleRegister } from "../controllers/registrationController";
import { handleIsUser } from "../controllers/userController"; // Ensure isUserAuthenticated is a valid middleware
import { handleChangePassword } from "@backend/src/controllers/authController";
const apiRouter = Router();

apiRouter.post("/login", handleLogin); // Ensure loginController is a valid middleware
apiRouter.post("/register", handleRegister);
apiRouter.post("/reset", handleChangePassword);
// apiRouter.post("/user", handleIsUser);

apiRouter.get("/user", handleIsUser); // Ensure isUserAuthenticated is a valid middleware

export default apiRouter;
