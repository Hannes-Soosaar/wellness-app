import { Request, Response, RequestHandler } from "express";
import pool from "../../server";
import hashPassword from "../utils/crypto";

const handleLogin: RequestHandler = (req, res) => {
  console.log("We arrived at the login controller!");
  res.status(200).json({ message: "Task completed" });
};

export default handleLogin;
