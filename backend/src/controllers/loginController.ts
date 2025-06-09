import { Request, Response, RequestHandler } from "express";
import pg from "../../server";
import { hashPassword, verifyPassword } from "../utils/crypto";
import handleProfile from "./profileController";
import { generateJWT, generateRefreshToken, verifyJWT } from "../utils/tokens";

interface loginRequest {
  email: string;
  password: string;
}

const handleLogin: RequestHandler = async (req: Request, res: Response) => {
  console.log("We arrived at the login controller!");
  console.log("request body", req.body);

  const { email, password }: loginRequest = req.body;

  try {
    const result = await pg.pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      console.log("user not found", result.rows);
      res
        .status(404)
        .json({ message: "Please check your login details, user not found" });
      return;
    }

    const user = result.rows[0];

    console.log("user found", user);
    try {
      const isValidUser: boolean = await verifyPassword(
        password,
        user.password
      );
      if (isValidUser) {
        const token = generateJWT(user.id);
        res
          .status(200)
          .json({ message: "All good, user found", token, user: user.email });
        return;
      }
    } catch (error) {
      console.error("Error verifying password:", error);
      res.status(401).json({
        message: "Please check your login details, password not valid",
      });
      return;
    }

    console.log("found user", result.rows[0]);
    console.log("DB password", user.password);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

const handleLogout: RequestHandler = async (req, res) => {
  console.log("Logout started");
  res.status(200).json({ message: "Task completed" });
  return;
};
export { handleLogin, handleLogout };

//TODO: Login with discord
//TODO: Login with google
