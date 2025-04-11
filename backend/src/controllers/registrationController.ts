import { Request, Response, RequestHandler } from "express";
import pool from "../../server";
import hashPassword from "../utils/crypto";

const handleRegister: RequestHandler = (req, res) => {
  console.log("We arrived at the register controller!");
  console.log("request body", req.body);
  res.status(200).json({ message: "Task completed" });
};

export default handleRegister;
