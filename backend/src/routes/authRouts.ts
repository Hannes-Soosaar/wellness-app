import { Router } from "express";
import {
  registerWithDiscord,
  registerWithGoogle,
  googleCallback,
  discordCallback,
  test,
} from "../controllers/authController";

import { verifyEmail } from "../controllers/verificationController";

const authRouter = Router();

authRouter.get("/google/register", registerWithGoogle); // from Front End
authRouter.get("/google/callback", googleCallback);
authRouter.get("/google/test", test); // from Front End
authRouter.get("/discord/test", test); // from Front End
authRouter.get("/discord/register", registerWithDiscord);
authRouter.get("/email/verification/", verifyEmail);
authRouter.get("/discord/callback", discordCallback);
authRouter.post("/refresh", test); // attempt to refresh the token
authRouter.post("/logout", test); // logout

export default authRouter;
