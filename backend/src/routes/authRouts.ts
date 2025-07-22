import { Router } from "express";
import {
  registerWithDiscord,
  registerWithGoogle,
  googleCallback,
  discordCallback,
  test,
  handleRefreshToken,
} from "../controllers/authController";

import { handleUpdateUserPassword } from "@backend/src/controllers/userController";

import { verifyEmail } from "../controllers/verificationController";

const authRouter = Router();

authRouter.get("/google/register", registerWithGoogle); // from Front End
authRouter.get("/google/callback", googleCallback);
authRouter.get("/google/test", test); // from Front End
authRouter.get("/discord/test", test); // from Front End
authRouter.get("/discord/register", registerWithDiscord);
authRouter.get("/email/verification", verifyEmail);
authRouter.get("/discord/callback", discordCallback);
authRouter.post("/refresh", handleRefreshToken); // attempt to refresh the token
authRouter.post("/verify/update", handleUpdateUserPassword);
authRouter.post("/logout", test); // logout

export default authRouter;
