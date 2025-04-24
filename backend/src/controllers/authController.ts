import { Request, Response } from "express";
import dotenv from "dotenv";
import { GoogleAuthOptions } from "../models/authModels";

dotenv.config();

const redirectUri: string =
  process.env.REDIRECT_URL_GOOGLE ||
  "http://localhost:5000/auth/google/callback";

export const registerWithGoogle = (req: Request, res: Response): void => {
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
