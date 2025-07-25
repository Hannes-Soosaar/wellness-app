import { Request, Response, RequestHandler } from "express";
import { pool } from "../../server";
import { hashPassword } from "../utils/crypto";
import { getBearerToken } from "./authController";
import { verifyJWT, verifyPasswordResetJWT } from "../utils/tokens";
import { ResponseData } from "@shared/types/api";

import dotenv from "dotenv";
import { setUserPasswordByResetToken } from "../services/tokenService";
dotenv.config();

// Not a useful function
const handleUser: RequestHandler = (req, res) => {
  console.log("We arrived at the user controller!");
  console.log("request body", req);
  res.status(200).json({ message: "Task completed" });
};

const handleIsUser: RequestHandler = async (req, res) => {
  const token = getBearerToken(req);

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

interface RequestData {
  token: string;
  password: string;
}

const handleUpdateUserPassword: RequestHandler = async (req, res) => {
  let response: ResponseData<null> = {
    success: false,
    message: "",
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

  request.password = req.body.password;
  request.token = req.body.token;

  // verify JWT and get email from JWT
  const requestToken = verifyPasswordResetJWT(request.token);

  if (!requestToken) {
    response.error = "Expired or invalid link";
    response.message = "";
    response.success = false;
    res.status(200).json(response);
    return;
  }
  try {
    const newHashedPassword = await hashPassword(request.password);
    request.password = newHashedPassword;
  } catch (error) {
    response.error = "Server error, updating password: " + error;
    response.message = "";
    response.success = false;
    res.status(500).json(response);
    return;
  }

  console.log("the Request", request);

  try {
    const updated = await setUserPasswordByResetToken(
      request.token,
      request.password
    );

    if (updated) {
      response.message = "The password has been updated";
      response.success = true;
      res.status(200).json(response);
    } else {
      response.error =
        "Error, updating password, please request new update link";
      response.message = "";
      response.success = false;
      res.status(200).json(response);
    }
  } catch (error) {
    response.error = "Server error, saving password";
    response.message = "";
    response.success = false;
    res.status(500).json(response);
    return;
  }
};

export { handleUser, handleIsUser, handleUpdateUserPassword };
