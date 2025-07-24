import { Router } from "express";
import { handleUser } from "../controllers/userController";
import { test } from "../controllers/authController";

const userRouter = Router();

userRouter.get("/user", handleUser);
userRouter.get("/refresh-token", handleUser);
userRouter.post("/activity", test);
userRouter.get("/activity/options", test);

export default userRouter;
