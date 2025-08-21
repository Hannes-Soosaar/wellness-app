import { Request, RequestHandler, response, Response } from "express";
import dotenv from "dotenv";
import { DiscordAuthOptions, GoogleAuthOptions } from "../models/authModels";
import axios from "axios";
import {
  handleRegisterWithDiscord,
  handleRegisterWithGoogle,
} from "./registrationController";
import {
  decodeAndCheckToken,
  generateJWT,
  generatePasswordResetJWT,
  generateRefreshToken,
  hashToken,
  verifyJWT,
  verifyJWTRefresh,
  generateTempToken,
} from "../utils/tokens";

import { ResponseData } from "@shared/types/api";
import { findUserIdByEmail } from "../services/user/userService";
import { sendPasswordResetEmail } from "../utils/emailService";
import { pool } from "../../server";
import { generateMfaUri } from "../utils/mfa";
import { getDecryptedUserSecret } from "../services/mfaService";

import { setUserPasswordResetJWT } from "@backend/src/services/tokenService";
dotenv.config();

// encryption key data at rest
const dbKey = process.env.DB_KEY;

// Google
const redirectUri: string =
  process.env.REDIRECT_URL_GOOGLE ||
  "https://localhost:5000/auth/google/callback";

// Discord
const redirectUriDiscord: string =
  process.env.REDIRECT_URL_DISCORD ||
  "https://localhost:5000/auth/discord/callback";

//Functions

export const registerWithGoogle = (req: Request, res: Response): void => {
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
};

export const registerWithDiscord = (req: Request, res: Response): void => {
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
};

export const discordCallback = async (
  req: Request,
  res: Response
): Promise<void> => {
  const code = req.query.code as string;

  if (!code) {
    res.status(400).json({ message: "Missing authorization code" });
    return;
  }

  try {
    const tokenPayload = new URLSearchParams();
    tokenPayload.append("code", code);
    tokenPayload.append("client_id", process.env.DISCORD_CLIENT_ID || "");
    tokenPayload.append(
      "client_secret",
      process.env.DISCORD_CLIENT_SECRET || ""
    );
    tokenPayload.append("redirect_uri", redirectUriDiscord);
    tokenPayload.append("grant_type", "authorization_code");

    const tokenResponse = await axios.post(
      "https://discord.com/api/oauth2/token",
      tokenPayload.toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { access_token } = tokenResponse.data;

    const userInfoResponse = await axios.get(
      "https://discord.com/api/v10/users/@me",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const user = userInfoResponse.data;

    //TODO: check to see if you can just login.

    const registrationResult = await handleRegisterWithDiscord(user);

    // TODO does not handle veri
    if (registrationResult.isRegistered) {
      // GET MFA status by oauth provider Id.

      // let mfaEnable = false;
      // try {
      //   const mfrStatus = await pool.query(
      //     "SELECT mfa_enabled FROM user_settings WHERE discord_id = $1",
      //     [user.id]
      //   );
      //   mfaEnable = mfrStatus.rows[0]?.mfa_enabled;
      //   console.log("MFA status:", mfrStatus.rows[0]?.mfa_enabled);
      // } catch (error) {
      //   console.error("Error fetching MFA status:", error);
      // }
      // if (mfaEnable) {
      //   getDecryptedUserSecret(user.id);
      //   console.log("MFA is enabled for this user");
      //   const preAuthToken = generateTempToken(user.id);
      //   const mfaUri = await generateMfaUri(user.id);
      //   res.status(200).json({
      //     message: "MFA enabled, please verify",
      //     tempToken: preAuthToken,
      //     mfaUri: mfaUri, // Need to change this probably
      //   });
      //   return;
      // }
      const tempToken = generateTempToken(user.id);
      try {
        await pool.query(
          `
          UPDATE users
          SET o_auth_token = $1
          WHERE discord_id = $2;
          `,
          [tempToken, user.id]
        );
        console.log("OAuth token inserted successfully");
        console.log("Redirecting to OAuth login with tempToken:", tempToken);
        res.redirect(`https://localhost:5173/oauth/login/${tempToken}`);
        return;
      } catch (error) {
        console.error("Error inserting OAuth token:", error);
        res.redirect("https://localhost:5173/login");
        return;
      }
    }

    if (registrationResult.state === "success") {
      res.redirect("https://localhost:5173/login");
    } else {
      res.redirect(
        "https://localhost:5173/register?status=error&message=" +
          encodeURIComponent(registrationResult.message)
      );
    }

    console.log("User info:", user);
  } catch (error) {
    console.error("Error during Discord callback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const googleCallback = async (
  req: Request,
  res: Response
): Promise<void> => {
  const code = req.query.code as string;

  if (!code) {
    res.status(400).json({ message: "Missing authorization code" });
    return;
  }

  try {
    const tokenPayload = new URLSearchParams();
    tokenPayload.append("code", code);
    tokenPayload.append("client_id", process.env.GOOGLE_CLIENT_ID || "");
    tokenPayload.append(
      "client_secret",
      process.env.GOOGLE_CLIENT_SECRET || ""
    );
    tokenPayload.append("redirect_uri", redirectUri);
    tokenPayload.append("grant_type", "authorization_code");

    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      tokenPayload.toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { access_token } = tokenResponse.data;

    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const user = userInfoResponse.data;

    console.log("User info:", user);

    const registrationResult = await handleRegisterWithGoogle(user);

    if (registrationResult.isRegistered) {
      // GET MFA status by oauth provider Id.

      // let mfaEnable = false;
      // try {
      //   const mfrStatus = await pool.query(
      //     "SELECT mfa_enabled FROM user_settings WHERE discord_id = $1",
      //     [user.id]
      //   );
      //   mfaEnable = mfrStatus.rows[0]?.mfa_enabled;
      //   console.log("MFA status:", mfrStatus.rows[0]?.mfa_enabled);
      // } catch (error) {
      //   console.error("Error fetching MFA status:", error);
      // }
      // if (mfaEnable) {
      //   getDecryptedUserSecret(user.id);
      //   console.log("MFA is enabled for this user");
      //   const preAuthToken = generateTempToken(user.id);
      //   const mfaUri = await generateMfaUri(user.id);
      //   res.status(200).json({
      //     message: "MFA enabled, please verify",
      //     tempToken: preAuthToken,
      //     mfaUri: mfaUri, // Need to change this probably
      //   });
      //   return;
      // }
      const tempToken = generateTempToken(user.id);
      try {
        await pool.query(
          `
          UPDATE users
          SET o_auth_token = $1
          WHERE google_id = $2;
          `,
          [tempToken, user.id]
        );
        console.log("OAuth token inserted successfully");
        console.log("Redirecting to OAuth login with tempToken:", tempToken);
        res.redirect(`https://localhost:5173/oauth/login/${tempToken}`);
        return;
      } catch (error) {
        console.error("Error inserting OAuth token:", error);
        res.redirect("https://localhost:5173/login");
        return;
      }
    }

    if (registrationResult.state === "success") {
      res.redirect("https://localhost:5173/login");
    } else {
      res.redirect(
        "https://localhost:5173/register?status=error&message=" +
          encodeURIComponent(registrationResult.message)
      );
    }

    // res.json(user);
  } catch (error) {
    console.error("Error during Google callback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const test = (req: Request, res: Response): void => {
  console.log("Test function called", req.body);
  res.status(200).json({ message: "Test function works" });
};

export const authenticateUser = (req: Request, res: Response): void => {
  console.log("Authenticate user function called");
  res.status(200).json({ message: "User authenticated" });
};

export const getBearerToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
};

export const handleRefreshToken: RequestHandler = async (req, res) => {
  const rawToken = req.cookies.refreshToken;

  const refreshToken = decodeURIComponent(req.cookies.refreshToken);
  if (!refreshToken || typeof refreshToken !== "string") {
    res.status(401).json({ message: "No refresh token provided" });
    return;
  }

  try {
    const payload = verifyJWTRefresh(refreshToken);

    const userId =
      typeof payload === "object" && "id" in payload ? payload.id : null;
    if (!userId) {
      res.status(403).json({ message: "Invalid refresh token payload " });
      return;
    }
    const newAccessToken = generateJWT(userId);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Invalid refresh token", error);
    res.status(403).json({ message: "Invalid refresh token" });
    return;
  }
};

export const handleChangePassword: RequestHandler = async (
  req: Request,
  res: Response
) => {
  let requestResponse: ResponseData<null> = {
    success: true,
    message: "",
  };

  if (!req.body.email) {
    requestResponse.success = false;
    requestResponse.message = "";
    requestResponse.error = "No email provided with the request";
    res.status(200).json(requestResponse);
    return;
  }

  if (!findUserIdByEmail(req.body.email)) {
    requestResponse.success = false;
    requestResponse.message = "";
    requestResponse.error =
      "Email with Verification link sent to :" + req.body.email;
    res.status(200).json(requestResponse);
    return;
  }

  const resetToken = generatePasswordResetJWT();
  console.log("Reset token generated:", resetToken);

  if (!resetToken) {
    requestResponse.success = false;
    requestResponse.message = "Please try again later";
    requestResponse.error = "Error getting a verification token";
    res.status(500).json(requestResponse);
    return;
  }

  try {
    const tokenSetForUser = await setUserPasswordResetJWT(
      req.body.email,
      resetToken
    );
    if (!tokenSetForUser) {
      requestResponse.success = false;
      requestResponse.message = "Please try again later";
      requestResponse.error = "Error setting a verification token";
      res.status(500).json(requestResponse);
      return;
    }
  } catch (error: any) {
    requestResponse.success = false;
    requestResponse.message = "Please try again later";
    requestResponse.data = error;
    requestResponse.error = "Error setting a verification token";
    res.status(500).json(requestResponse);
    return;
  }

  try {
    console.log("Sending password reset token :", resetToken);
    const response = await sendPasswordResetEmail(req.body.email, resetToken);
  } catch (error: any) {
    requestResponse.success = false;
    requestResponse.message = "Please try again later";
    requestResponse.data = error; // CHECK THE FLOW HERE!
    requestResponse.error = "Error setting a verification token";
    res.status(500).json(requestResponse);
    return;
  }
  requestResponse.success = true;
  requestResponse.message = "The reset link has been sent to" + req.body.email;

  res.status(200).json(requestResponse);
};

export const handleOauthLogin: RequestHandler = async (
  req: Request,
  res: Response
) => {
  console.log("We arrived at the oauth login controller!");
  console.log("request params", req.body);
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ message: "No token provided" });
    return;
  }

  const payload = verifyJWT(token);
  const userId = payload.id;

  if (!userId) {
    res.status(403).json({ message: "Invalid token payload" });
    return;
  }

  try {
    const user = await pool.query(
      "SELECT id FROM users WHERE o_auth_token = $1",
      [token]
    );
    if (user.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // need to get the real uuid from the  DB
    const accessToken = generateJWT(user.rows[0].id);
    const refreshToken = generateRefreshToken(user.rows[0].id);
    try {
      await pool.query(
        "UPDATE users SET refresh_token = $1 WHERE  o_auth_token =$2",
        [refreshToken, token]
      );
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
        });
      return;
    } catch (error) {
      console.error("Login failed", error);
      res.status(401).json({
        message:
          "Please check your login details and make sure you have verified your email  not valid",
      });
      return;
    }
  } catch (error) {
    console.error("Error during OAuth login:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
