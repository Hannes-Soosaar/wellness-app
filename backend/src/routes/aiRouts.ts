import { Router } from "express";
import { getAiAdvice } from "../controllers/aiController";
import test from "node:test";

const aiRouter = Router();

// aiRouter.post("/advice", getAiAdvice);
aiRouter.post("/advice", getAiAdvice);

export default aiRouter;
