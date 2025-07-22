import { pool } from "@backend/server";
import dotenv from "dotenv";
import { userData } from "@backend/src/models/userModel";
import { response } from "express";

dotenv.config();

const dbKey = process.env.DB_KEY;

if (!dbKey) {
  console.log("Missing crypto key for DB");
}

export const findUserIdByEmail = async (
  email: string
): Promise<string | null> => {
  try {
    const response = await pool.query(
      "SELECT id FROM users WHERE pgp_sym_decrypt(email, $2)= $1",
      [email, dbKey]
    );
    if (response.rows.length > 0) {
      return response.rows[0]?.id as string;
    } else {
      return null;
    }
  } catch (error) {
    console.log("error getting user result", error);
    return null;
  }
};

export const setUserPassword = async (
  userId: string,
  passwordHash: string
): Promise<boolean> => {
  try {
    const response = await pool.query(
      "UPDATE users SET password=$1 WHERE id= $2",
      [passwordHash, userId]
    );
    if (response.rowCount === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error updating password", error);
    return false;
  }
};

export const createUser = async (userData: userData): Promise<boolean> => {
  return false;
};

export const updateUserProfile = async <T>(
  userProfile: T
): Promise<boolean> => {
  return false;
};

export const setUserPasswordResetJWT = async (
  email: string,
  resetJWT: string
): Promise<boolean> => {
  try {
    const response = await pool.query(
      "UPDATE users SET password_reset_token = $2 WHERE pgp_sym_decrypt(email, $3)= $1",
      [email, resetJWT, dbKey]
    );

    if (response.rowCount === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Setting token db error", error);
    return false;
  }
};

export const getUserPasswordResetJWT = async (
  resetJWT: string
): Promise<string | null> => {
  try {
    const response = await pool.query(
      "SELECT password_reset_token FROM users WHERE id = $1",
      [resetJWT]
    );
    if (response.rows.length > 0) {
      return response.rows[0]?.password_reset_token as string;
    } else {
      return null;
    }
  } catch (error) {
    console.log("error getting the reset JWT", error);
    return null;
  }
};
