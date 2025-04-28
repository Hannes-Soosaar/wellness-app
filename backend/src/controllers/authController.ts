import { Request, Response } from "express";
import dotenv from "dotenv";
import { GoogleAuthOptions } from "../models/authModels";
import axios from "axios";
import { handleRegisterWithGoogle } from "./registrationController";

dotenv.config();

const redirectUri: string =
  process.env.REDIRECT_URL_GOOGLE ||
  "http://localhost:5000/auth/google/callback";

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
  ).toString(); // the URLSearchParams constructor expects a record of string key-value pairs hence a direct cast with the interface is not possible.
  res.redirect(`${rootUrl}?${qs}`);
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
    handleRegisterWithGoogle(user);

    res.json(user);
  } catch (error) {
    console.error("Error during Google callback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const test = (req: Request, res: Response): void => {
  console.log("Test function called");
  res.status(200).json({ message: "Test function works" });
};
