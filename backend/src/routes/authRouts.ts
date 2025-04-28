import { Router } from "express";
import {
  registerWithGoogle,
  googleCallback,
  test,
} from "../controllers/authController";

const authRouter = Router();

authRouter.get("/google/register", registerWithGoogle); // from Front End
authRouter.get("/google/callback", googleCallback);
authRouter.get("/google/test", test); // from Front End

export default authRouter;
