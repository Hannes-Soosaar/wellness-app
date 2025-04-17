import { Request, Response, RequestHandler } from "express";
import pg from "../../server";
import { hashPassword } from "../utils/crypto";
import handleProfile from "./profileController";
import { generateJWT, verifyJWT } from "../utils/tokens";

interface loginRequest {
  email: string;
  password: string;
}

const handleLogin: RequestHandler = async (req, res) => {
  console.log("We arrived at the login controller!");
  console.log("request body", req.body);

  const { email, password }: loginRequest = req.body;

  try {
    const result = await pg.pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Please check your login details, user not found" });
    }

    const user = result.rows[0];
    const userPassword = await hashPassword(password);

    if (user.password === userPassword) {
      return res
        .status(200)
        .json({ message: "All good, user found", user: user });
    }

    // TODO see if user exists, if it exists check if password is correct
    // TODO if password is correct, generate a JWT token and send it back to the client
    // TODO if password is not correct, send an error message
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }

  // res.status(200).json({ message: "Task completed" });
};

const handleLogout: RequestHandler = async (req, res) => {
  console.log("Logout started");
  res.status(200).json({ message: "Task completed" });
};
export { handleLogin, handleLogout };
