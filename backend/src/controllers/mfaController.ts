import { authenticator } from "otplib";
import { z } from "zod";
import { getUserId } from "./verificationController";
import { ResponseData } from "@shared/types/api";
import { Request, RequestHandler, Response } from "express";

// This needs to be checked and ran once mf2 is enabled.
export const handleVerifyMfa: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const userId = getUserId(req);
  if (!userId) {
    res.status(401).json({ error: "User not authenticated" });
    return;
  }

  const result = await 
};

//   try {
//     const secret = authenticator.generateSecret();
//     // Store the secret in the database associated with the userId (not implemented here)
//     res.status(200).json({ secret });
//   } catch (error) {
//     console.error("Error generating MFA secret:", error);
//     res.status(500).json({ error: "Failed to generate MFA secret" });
//   }
