import { Request, Response, RequestHandler } from "express";
import pool from "../../server";
import { hashPassword } from "../utils/crypto";
import handleProfile from "./profileController";
import { generateJWT, verifyJWT } from "../utils/tokens";

interface loginRequest {
  email: string;
  password: string;
}

const handleLogin: RequestHandler = async (req, res) => {
  console.log("We arrived at the login controller!");

  try {
    // TODO see if user exists, if it exists check if password is correct
    // TODO if password is correct, generate a JWT token and send it back to the client
    // TODO if password is not correct, send an error message
  } catch (error) {}

  res.status(200).json({ message: "Task completed" });
};

const handleLogout: RequestHandler = async (req, res) => {
  console.log("Logout started");
  res.status(200).json({ message: "Task completed" });
};
export { handleLogin, handleLogout };
