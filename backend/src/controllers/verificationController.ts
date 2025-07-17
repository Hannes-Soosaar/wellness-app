import { Request, Response, RequestHandler } from "express";
import { pool } from "../../server";

const verifyEmail: RequestHandler = async (req, res) => {
  console.log("verifying email", req);
  const { token } = req.query;

  if (!token) {
    res.status(400).json({ message: "Invalid or expired token" });
    return;
  }

  //TODO: add time constraint to the token.
  const result = await pool.query(
    "SELECT * FROM users WHERE verification_token =$1",
    [token]
  );

  if (result.rows.length === 0) {
    res.status(400).json({ message: "Invalid or expired token" });
    return;
  }

  await pool.query(
    "UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE verification_token = $1",
    [token]
  );

  res.status(200).json({
    message: "Email Verified",
  });
};

export { verifyEmail };
