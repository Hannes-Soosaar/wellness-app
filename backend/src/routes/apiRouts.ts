// Routs that do not require authentication
// Includes login, and register

import { Router } from "express";
import { handleLogin } from "../controllers/loginController";
import { handleRegister } from "../controllers/registrationController";
import { handleIsUser } from "../controllers/userController"; // Ensure isUserAuthenticated is a valid middleware

const apiRouter = Router();

apiRouter.post("/login", handleLogin); // Ensure loginController is a valid middleware
apiRouter.post("/register", handleRegister);
apiRouter.post("/user", handleIsUser); // Ensure isUserAuthenticated is a valid middleware

export default apiRouter;
