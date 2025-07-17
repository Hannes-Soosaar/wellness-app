import { Request, Response, RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import { pool } from "../../server";
import { hashPassword } from "../utils/crypto";
import { sendVerificationEmail } from "../utils/emailService";
import { GoogleUser } from "../models/googleUserModel";

const handleRegister: RequestHandler = async (req, res) => {
  console.log("We arrived at the register controller!");
  console.log("request body", req.body);

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    console.log("Email to register", email);

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email= $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      res.status(400).json({ message: "Error creating user" });
      return;
    }
    console.log("Password to hash", password);
    const hashedPassword = await hashPassword(password);
    console.log("hashed password", hashedPassword);

    const verificationToken = uuidv4();

    //TODO: add a new refresh token to the user
    const result = await pool.query(
      `
      INSERT INTO users(email,password,verification_token)
      VALUES ($1,$2,$3)
      RETURNING id,email,created_at
    
    `,
      [email, hashedPassword, verificationToken]
    );

    const newUser = result.rows[0];
    res.status(200).json({
      messager: "Waiting for email confirmation",
      user: result.rows[0],
    });

    sendVerificationEmail(email, verificationToken);
  } catch (err) {
    console.error("Error during user registration", err);
    res.status(500).json({ message: " Internal server error." });
  }
};

const handleRegisterWithGoogle = async (
  user: any
): Promise<{ state: string; message: string }> => {
  console.log("Register with google");
  console.log("user to register", user);

  let newUser: GoogleUser = {
    id: user.id,
    email: user.email,
  };

  console.log("new user", newUser);
  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email= $1",
      [newUser.email]
    );

    if (existingUser.rows.length > 0) {
      console.log("User already exists");
      return { state: "error", message: "User already exists" };
    }
    const verificationToken = uuidv4();

    await pool.query(
      `
      INSERT INTO users(google_id, email, verification_token)
      VALUES ($1, $2, $3)
      `,
      [newUser.id, newUser.email, verificationToken]
    );
    sendVerificationEmail(newUser.email, verificationToken);
    return { state: "success", message: "new user created" };
  } catch (error) {
    console.error("Error during user registration", error);
    return { state: "error", message: "Internal server error" };
  }
};

// export const handleRegisterWithGitHub = async (gitUser:any) Promise<{ state: string,message: string} > => {
//   console.log("We are Registring with github register controller!");
//   console.log("user to register", gitUser);
//     return { state: "error", message: "Not implemented yet" };
// };

const handleRegisterWithDiscord = async (
  user: any
): Promise<{ state: string; message: string }> => {
  console.log("Register with discord");
  console.log("user to register", user);
  //TODO : Implement discord registration
};

export { handleRegister, handleRegisterWithDiscord, handleRegisterWithGoogle };
