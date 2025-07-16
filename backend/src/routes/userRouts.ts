import { Router } from "express";
import { handleUser } from "../controllers/userController";

const userRouter = Router();

userRouter.get("/user", handleUser);
userRouter.get("/refresh-token", handleUser);

export default userRouter;
