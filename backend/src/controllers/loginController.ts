import { Request, Response, RequestHandler } from "express";
import { pool } from "../../server";
import { verifyPassword } from "../utils/crypto";

import {
  generateJWT,
  generateRefreshToken,
  generateTempToken,
} from "../utils/tokens";
import dotenv from "dotenv";
import { generateMfaUri } from "../utils/mfa";
import { getDecryptedUserSecret } from "../services/mfaService";

dotenv.config();
const dbKey = process.env.DB_KEY;

interface loginRequest {
  email: string;
  password: string;
}

const handleLogin: RequestHandler = async (req: Request, res: Response) => {
  console.log("We arrived at the login controller!");
  console.log("request body", req.body);

  const { email, password }: loginRequest = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE pgp_sym_decrypt(email, $2) = $1",
      [email, dbKey]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Please check your login details" });
      return;
    }

    const user = result.rows[0];

    let mfaEnable = false;
    try {
      const mfrStatus = await pool.query(
        "SELECT mfa_enabled FROM user_settings WHERE user_id = $1",
        [user.id]
      );
      mfaEnable = mfrStatus.rows[0]?.mfa_enabled;
      console.log("MFA status:", mfrStatus.rows[0]?.mfa_enabled);
    } catch (error) {
      console.error("Error fetching MFA status:", error);
    }

    try {
      console.log("Trying to verify");
      const hasValidPassword: boolean = await verifyPassword(
        password,
        user.password
      );

      if (!hasValidPassword) {
        console.log("Wrong password");
        res.status(404).json({
          message: "User Not found",
        });
        return;
      }

      const hasVerifiedEmail = await pool.query(
        " SELECT is_verified FROM users WHERE pgp_sym_decrypt(email, $2) = $1 ",
        [email, dbKey]
      );

      const isVerified = hasVerifiedEmail.rows[0]?.is_verified === true;

      if (!isVerified) {
        console.log("Verify Email");
        res.status(401).json({
          message: "Verify Email please!",
        });
        return;
      }

      let isValidUser: boolean = isVerified && hasValidPassword;

      if (isValidUser) {
        if (mfaEnable) {
          getDecryptedUserSecret(user.id);
          console.log("MFA is enabled for this user");
          const preAuthToken = generateTempToken(user.id);
          const mfaUri = await generateMfaUri(user.id);
          res.status(200).json({
            message: "MFA enabled, please verify",
            tempToken: preAuthToken,
            mfaUri: mfaUri,
          });
          return;
        }

        console.log("im a VERIFIED USER");
        const accessToken = generateJWT(user.id);
        const refreshToken = generateRefreshToken(user.id);

        await pool.query("UPDATE users SET refresh_token = $1 WHERE  id =$2", [
          refreshToken,
          user.id,
        ]);

        res
          .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
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
      console.error("Login failed", error);
      res.status(401).json({
        message:
          "Please check your login details and make sure you have verified your email  not valid",
      });
      return;
    }
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
