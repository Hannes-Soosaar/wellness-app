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
  //TODO: Extract to Serivces
  const result = await pool.query(
    "UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE verification_token = $1",
    [token]
  );

  if (!result.rowCount) {
    //TODO: create an error page, with a link to request new verification
    res.status(400).json({ message: "Invalid or expired token" });
    return;
  }

  res.redirect("https://localhost:5173/login");
};

export const verifyUser = (req: Request): boolean => {
  const token = getBearerToken(req);
  if (!token) {
    console.log("no token ");
    return false;
  }
  try {
    const verified = verifyJWT(token);
    console.log("Token is valid", verified);
    return true;
  } catch (error: any) {
    console.log(" error verifying token");
    return false;
  }
};
