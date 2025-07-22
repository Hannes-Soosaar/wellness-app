import { Request, Response, RequestHandler } from "express";
import { pool } from "../../server";
import { hashPassword } from "../utils/crypto";
import { getBearerToken } from "./authController";
import { verifyJWT } from "../utils/tokens";

const handleUser: RequestHandler = (req, res) => {
  console.log("We arrived at the user controller!");
  console.log("request body", req);
  res.status(200).json({ message: "Task completed" });
};

const handleIsUser: RequestHandler = async (req, res) => {
  const token = getBearerToken(req);
  const refreshToken = req.cookies?.refreshToken;

  if (!token) {
    res.status(401).json({ message: "No token provided" }); // This might be better handled with a different error code.
    return;
  }

  try {
    const decoded = verifyJWT(token);
    console.log("Token is valid", decoded);
    res.status(200).json({ message: "Token is valid", user: decoded });
  } catch (error: any) {
    console.log("Token is not valid", error?.message);
    // Optionally, check for token expiration error
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expired" });
    } else {
      res.status(401).json({ message: "Token is not valid" });
    }
  }
};

export { handleUser, handleIsUser };
