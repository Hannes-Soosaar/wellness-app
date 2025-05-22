import { Router } from "express";
import {
  registerWithDiscord,
  registerWithGoogle,
  googleCallback,
  discordCallback,
  test,
} from "../controllers/authController";

const authRouter = Router();

authRouter.get("/google/register", registerWithGoogle); // from Front End
authRouter.get("/google/callback", googleCallback);
authRouter.get("/google/test", test); // from Front End
authRouter.get("/discord/test", test); // from Front End
authRouter.get("/discord/register", registerWithDiscord);
authRouter.get("/discord/callback", discordCallback);
authRouter.get("/refresh"); // attempt to refresh the token

export default authRouter;
