import { Router } from "express";
import { handleLogin } from "../controllers/loginController";
import { handleRegister } from "../controllers/registrationController";
import { handleIsUser } from "../controllers/userController"; // Ensure isUserAuthenticated is a valid middleware
import { handleChangePassword } from "@backend/src/controllers/authController";
import { handleVerifyMfa } from "../controllers/mfaController"; // Ensure MFA verification is handled correctly
const apiRouter = Router();

apiRouter.post("/login", handleLogin);
apiRouter.post("/login/mfa", handleVerifyMfa);
apiRouter.post("/register", handleRegister);
apiRouter.post("/reset", handleChangePassword); // not in use?
// apiRouter.post("/user", handleIsUser);

apiRouter.get("/user", handleIsUser); // Ensure isUserAuthenticated is a valid middleware

export default apiRouter;
