import { Request, Response, RequestHandler } from "express";
import pool from "../../server";
import { hashPassword } from "../utils/crypto";

const handleUser: RequestHandler = (req, res) => {
  console.log("We arrived at the user controller!");
  console.log("request body", req);
  res.status(200).json({ message: "Task completed" });
};

const handleIsUser: RequestHandler = async (req, res) => {
  res.status(200).json({ message: "Has token and is active user" });
};

export default { handleUser, handleIsUser };
