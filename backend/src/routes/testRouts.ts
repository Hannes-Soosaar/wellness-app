import { Router } from "express";
import { handleTest } from "../controllers/testController";

const testRouter = Router();

testRouter.get("/user", handleTest);

export default testRouter;
