import { Request, Response, RequestHandler } from "express";
import { pool } from "../../server";
import { hashPassword, verifyPassword } from "../utils/crypto";
import handleProfile from "./profileController";
import { generateJWT, generateRefreshToken, verifyJWT } from "../utils/tokens";
import dotenv from "dotenv";
dotenv.config();
const dbKey = process.env.DB_KEY;

interface loginRequest {
  email: string;
  password: string;
}
//TODO: clean up logs
const handleLogin: RequestHandler = async (req: Request, res: Response) => {
  console.log("We arrived at the login controller!");
  console.log("request body", req.body);
  const { email, password }: loginRequest = req.body;

  try {
    console.log("The secret key is ", dbKey);
    console.log("the email we are looking for is ", email);
    const result = await pool.query(
      "SELECT * FROM users WHERE pgp_sym_decrypt(email, $2) = $1",
      [email, dbKey]
    );
    if (result.rows.length === 0) {
      console.log("user not found", result.rows);
      res
        .status(404)
        .json({ message: "Please check your login details, user not found" });
      return;
    }
    const user = result.rows[0];
    try {
      const isValidUser: boolean = await verifyPassword(
        password,
        user.password
      );
      if (isValidUser) {
        const accessToken = generateJWT(user.id);
        const refreshToken = generateRefreshToken(user.id);
        console.log("This is the generated  TOKEN:", accessToken);
        console.log("This is the generated Refresh TOKEN:", refreshToken);

        await pool.query("UPDATE users SET refresh_token = $1 WHERE  id =$2", [
          refreshToken,
          user.id,
        ]);

        res
          .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          })
          .status(200)
          .json({
            message: "All good, user found",
            token: accessToken,
            user: user.email,
          });
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
