import { Router } from "express";
import {
  getAiAdvice,
  getWeeklyAdvice,
  getMonthlyAdvice,
} from "../controllers/aiController";

const aiRouter = Router();

aiRouter.get("/advice", getAiAdvice);
aiRouter.get("/advice/week", getWeeklyAdvice); // summary of the week and advice for the next week
aiRouter.get("/advice/month", getMonthlyAdvice); // summary of the month and advice for the next month

export default aiRouter;
