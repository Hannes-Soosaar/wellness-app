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
import { DiscordAuthOptions, GoogleAuthOptions } from "../models/authModels";

dotenv.config();
const dbKey = process.env.DB_KEY;

interface loginRequest {
  email: string;
  password: string;
}

// Google
const redirectUri: string =
  process.env.REDIRECT_URL_GOOGLE ||
  "http://localhost:5000/auth/google/callback";

// Discord
const redirectUriDiscord: string =
  process.env.REDIRECT_URL_DISCORD ||
  "http://localhost:5000/auth/discord/callback";

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

// export const loginWithoauth = async (
//   req: Request,

export const handleLoginGoogle: RequestHandler = async (req, res) => {
  console.log("Register with Google started");
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options: GoogleAuthOptions = {
    redirect_uri: redirectUri,
    client_id:
      process.env.GOOGLE_CLIENT_ID ||
      "285075991742-u2ngj3bpoo2empncndftc6vv0g7e9361.apps.googleusercontent.com",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  const qs: string = new URLSearchParams(
    options as unknown as Record<string, string>
  ).toString();
  res.redirect(`${rootUrl}?${qs}`);
  return;
};

export const handleLoginDiscord: RequestHandler = async (req, res) => {
  console.log("Register with Discord started");
  const rootUrl = "https://discord.com/api/oauth2/authorize";
  const options: DiscordAuthOptions = {
    redirect_uri: redirectUriDiscord,
    client_id: process.env.DISCORD_CLIENT_ID || "1367455291721121865", // Replace with your Discord client ID
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: ["identify", "email"].join(" "),
  };

  const qs: string = new URLSearchParams(
    options as unknown as Record<string, string>
  ).toString(); // the URLSearchParams constructor expects a record of string key-value pairs hence a direct cast with the interface is not possible.
  res.redirect(`${rootUrl}?${qs}`);
  return;
};

const handleLogout: RequestHandler = async (req, res) => {
  // Delete the refresh token
  // Delete the cookie?
  console.log("Logout started");
  res.status(200).json({ message: "Task completed" });
  return;
};

export { handleLogin, handleLogout };

//TODO: Login with discord
//TODO: Login with google
