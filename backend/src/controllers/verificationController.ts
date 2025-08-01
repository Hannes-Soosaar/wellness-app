import { Request, Response, RequestHandler } from "express";
import { pool } from "../../server";
import { getBearerToken } from "./authController";
import { verifyJWT } from "../utils/tokens";

export const verifyEmail: RequestHandler = async (req, res) => {
  console.log("verifying email", req);
  const { token } = req.query;

  if (!token) {
    res.status(400).json({ message: "Invalid or expired token" });
    return;
  }

  const result = await pool.query(
    "UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE verification_token = $1",
    [token]
  );

  if (!result.rowCount) {
    res.status(400).json({ message: "Invalid or expired token" });
    return;
  }

  res.redirect("https://localhost:5173/login");
};

// simple token verification for user routes.
export const getUserId = (req: Request): string => {
  const token = getBearerToken(req);
  if (!token) {
    console.log("no token ");
    return "";
  }
  try {
    const verified = verifyJWT(token);
    console.log("Token is valid", verified);
    return verified.id;
  } catch (error: any) {
    console.log(" error verifying token");
    return "";
  }
};
