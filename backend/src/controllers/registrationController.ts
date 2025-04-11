import { Request, Response, RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import pg from "../../server";
import { hashPassword } from "../utils/crypto";
import { sendVerificationEmail } from "../utils/emailService";

const handleRegister: RequestHandler = async (req, res) => {
  console.log("We arrived at the register controller!");
  console.log("request body", req.body);

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const existingUser = await pg.pool.query(
      "SELECT * FROM users WHERE email= $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      res.status(400).json({ message: "Error creating user" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const verificationToken = uuidv4();

    const result = await pg.pool.query(
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

//TODO Add register with Oauth google
//TODO add register with Oauth git

export default handleRegister;
