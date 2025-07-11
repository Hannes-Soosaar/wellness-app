import { Request, RequestHandler, response, Response } from "express";
import dotenv from "dotenv";
import { DiscordAuthOptions, GoogleAuthOptions } from "../models/authModels";
import axios from "axios";
import { handleRegisterWithGoogle } from "./registrationController";
import {
  generateJWT,
  generateRefreshToken,
  verifyJWT,
  verifyJWTRefresh,
} from "../utils/tokens";
import pg from "../../server";

dotenv.config();

// Google
const redirectUri: string =
  process.env.REDIRECT_URL_GOOGLE ||
  "http://localhost:5000/auth/google/callback";

// Discord
const redirectUriDiscord: string =
  process.env.REDIRECT_URL_DISCORD ||
  "http://localhost:5000/auth/discord/callback";

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

    const registrationResult = await handleRegisterWithGoogle(user);

    if (registrationResult.state === "success") {
      res.redirect("http://localhost:5173/login");
    } else {
      res.redirect(
        "http://localhost:5173/register?status=error&message=" +
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

    if (registrationResult.state === "success") {
      res.redirect("http://localhost:5173/login");
    } else {
      res.redirect(
        "http://localhost:5173/register?status=error&message=" +
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
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(401).json({ message: "No refresh token provided" });
    return;
  }

  try {
    const payload = verifyJWTRefresh(refreshToken);
    console.log("Refresh token payload:", payload);

    const userId =
      typeof payload === "object" && "id" in payload ? payload.id : null;

    if (!userId) {
      res.status(403).json({ message: "Invalid refresh token payload " });
      return;
    }

    const result = await pg.pool.query(
      "SELECT * FROM users WHERE id = $1 AND refresh_token= $2",
      [userId, refreshToken]
    );

    if (result.rows.length === 0) {
      res.status(403).json({ message: "Invalid refresh token" });
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
