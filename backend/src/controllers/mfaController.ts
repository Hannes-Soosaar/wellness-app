import { authenticator } from "otplib";
import { z } from "zod";
import { getUserId } from "./verificationController";
import { ResponseData } from "@shared/types/api";
import { Request, RequestHandler, Response } from "express";
import { pool } from "@backend/server";
import { generateJWT, generateRefreshToken } from "../utils/tokens";
import { verifyMfaToken } from "../utils/mfa";

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
  const mfaToken = req.body.mfaToken;
  if (!mfaToken) {
    res.status(400).json({ error: "MFA token is required" });
  }

  verifyMfaToken(mfaToken, userId);

  const result = await pool.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);
  const user = result.rows[0];
  if (!user) {
    res.status(404).json({ error: "User not found" });
  }

  const accessToken = generateJWT(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await pool.query("UPDATE users SET refresh_token =$1 WHERE id = $2", [
    refreshToken,
    userId,
  ]);

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      message: "All good, user found",
      token: accessToken,
    });

  return;
};
