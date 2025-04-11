import { Request, Response, RequestHandler } from "express";
import pool from "../../server";
import hashPassword from "../utils/crypto";

const handleUser: RequestHandler = (req, res) => {
  console.log("We arrived at the user controller!");
  console.log("request body", req);
  res.status(200).json({ message: "Task completed" });
};

export default handleUser;
