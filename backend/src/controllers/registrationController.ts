import { Request, Response, RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import { pool } from "../../server";
import { hashPassword } from "../utils/crypto";
import { sendVerificationEmail } from "../utils/emailService";
import { GoogleUser, DiscordUser } from "../models/googleUserModel";
import dotenv from "dotenv";
dotenv.config();
const dbKey = process.env.DB_KEY;

const handleRegister: RequestHandler = async (req, res) => {
  console.log("We arrived at the register controller!");
  console.log("request body", req.body);

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE pgp_sym_decrypt(email, $2) = $1",
      [email, dbKey]
    );

    if (existingUser.rows.length > 0) {
      res.status(400).json({ message: "Error creating user" });
      return;
    }
    console.log("Password to hash", password);
    const hashedPassword = await hashPassword(password);
    console.log("hashed password", hashedPassword);

    const verificationToken = uuidv4();

    const result = await pool.query(
      `
      INSERT INTO users(email,password,verification_token)
      VALUES (pgp_sym_encrypt($1,$4),$2,$3)
      RETURNING id, pgp_sym_decrypt(email,$4),created_at
    `,
      [email, hashedPassword, verificationToken, dbKey]
    );

    const newUser = result.rows[0];
    res.status(200).json({
      message: "Waiting for email confirmation",
      user: result.rows[0],
    });

    sendVerificationEmail(email, verificationToken);
  } catch (err) {
    console.error("error during user registration", err);
    res.status(500).json({ message: " Internal server error." });
  }
};

interface oauth2RegisterResponse {
  isRegistered: boolean;
  state: string;
  message: string;
}

// Functions Reg. with google and discord could be merged into one, but for now they are separate for clarity and would need to handle the different provider ID's

const handleRegisterWithGoogle = async (
  user: any
): Promise<oauth2RegisterResponse> => {
  console.log("Register with google");
  console.log("user to register", user);

  let newUser: GoogleUser = {
    id: user.id,
    email: user.email,
  };
  let response: oauth2RegisterResponse = {
    isRegistered: false,
    state: "error",
    message: "",
  };

  console.log("new user", newUser);
  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE pgp_sym_decrypt(email, $2) =$1 ",
      [newUser.email, dbKey]
    );
    if (existingUser.rows.length > 0) {
      console.log("User already exists");
      response.isRegistered = true;
      response.state = "error";
      response.message = "User already exists try a different login method";
      //Login!
      return response;
    }
    const verificationToken = uuidv4();
    try {
      const result = await pool.query(
        `
      INSERT INTO users(google_id, email, verification_token, is_verified)
      VALUES ($1,pgp_sym_encrypt($2,$4), $3, true)
      `,
        [newUser.id, newUser.email, verificationToken, dbKey]
      );
      if (result.rowCount === 0) {
        response.state = "error";
        response.message = "Error creating user";
        return response;
      }
      console.log("User created successfully");
    } catch (error) {
      console.error("Error during user registration", error);
      throw new Error("Internal server error" + error);
    }
    response.state = "success";
    response.message = "User created successfully";
    return response;
  } catch (error) {
    console.error("Error during user registration", error);
    throw new Error("Internal server error" + error);
  }
};

const handleRegisterWithDiscord = async (
  user: any
): Promise<oauth2RegisterResponse> => {
  console.log("Register with discord");
  console.log("user to register", user);

  let newUser: DiscordUser = {
    id: user.id,
    email: user.email,
  };

  let response: oauth2RegisterResponse = {
    isRegistered: false,
    state: "error",
    message: "",
  };

  console.log("new user", newUser);
  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE pgp_sym_decrypt(email, $2) = $1 ",
      [newUser.email, dbKey]
    );
    if (existingUser.rows.length > 0) {
      console.log("User already exists");
      response.isRegistered = true;
      response.state = "error";
      response.message = "User already exists try a different login method";
      return response;
    }
    const verificationToken = uuidv4();
    try {
      const result = await pool.query(
        `
      INSERT INTO users(discord_id, email, verification_token, is_verified)
      VALUES ($1,pgp_sym_encrypt($2,$4), $3,true)
      `,
        [newUser.id, newUser.email, verificationToken, dbKey]
      );
      if (result.rowCount === 0) {
        response.state = "error";
        response.message = "Error creating user";
        return response;
      }
      console.log("User created successfully");
    } catch (error) {
      console.error("Error during user registration", error);
      throw new Error("Internal server error" + error);
    }
    response.state = "success";
    response.message = "User created successfully ";
    return response;
  } catch (error) {
    console.error("Error during user registration", error);
    throw new Error("Internal server error" + error);
  }
};

export { handleRegister, handleRegisterWithDiscord, handleRegisterWithGoogle };
