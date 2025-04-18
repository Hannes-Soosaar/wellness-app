import { Router } from "express";

const authRouter = Router();

authRouter.get("/auth/google/register", registerWithGoogle); // from Front End
authRouter.get("/auth/google/callback", googleCallback);

export default authRouter;
