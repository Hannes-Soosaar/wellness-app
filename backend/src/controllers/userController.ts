import { Request, Response, RequestHandler } from "express";
import { pool } from "../../server";
import { hashPassword } from "../utils/crypto";
import { getBearerToken } from "./authController";
import { verifyJWT, verifyPasswordResetJWT } from "../utils/tokens";
import { ResponseData } from "@shared/types/api";

import dotenv from "dotenv";
dotenv.config();

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

//
interface RequestData {
  token: string;
  password: string;
}

const handleUpdateUserPassword: RequestHandler = (req, res) => {
  let response: ResponseData<null> = {
    success: false,
    message: "Password Changed, if you were logged in, you will be logged out.",
  };

  let request: RequestData = {
    token: "",
    password: "",
  };

  if (!req.body) {
    response.error = "No data was provided";
    response.message = "";
    response.success = false;
    res.status(200).json(response);
    return;
  }

  if (!req.body.token) {
    response.error = "Request incomplete" + request.token;
    response.message = "";
    response.success = false;
    res.status(200).json(response);
    return;
  }

  if (!req.body.password) {
    response.error = "Request incomplete" + request.password;
    response.message = "";
    response.success = false;
    res.status(200).json(response);
    return;
  }



  console.log(req.body);

  const isValidToken = verifyPasswordResetJWT(req.body.token);

  if (!isValidToken) {
        response.error = "Expired or wrong link";
        response.message = "";
        response.success = false;
        res.status(200).json(response);
        return;
  }

  const 

  // verify JWT
  // get e-mail from JWT
  // find user by email
  // update password
    
    
  // remove password JWT from DB
  // remove refresh token from DB.

  res.status(200).json(response);
};

export { handleUser, handleIsUser, handleUpdateUserPassword };
