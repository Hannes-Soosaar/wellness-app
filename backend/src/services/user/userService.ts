import { pool } from "@backend/server";
import dotenv from "dotenv";
import { userData } from "@backend/src/models/userModel";
import { response } from "express";
import { throwDeprecation } from "process";

dotenv.config();

const dbKey = process.env.DB_KEY;

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

export const getUserWeightById = async (userId: string): Promise<number> => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  let currentUserWeigh = 0;
  await pool
    .query("SELECT current_weight FROM user_profile WHERE user_id = $1", [
      userId,
    ])
    .then((result) => {
      if (result.rows.length > 0) {
        currentUserWeigh = result.rows[0].current_weight;
      } else {
        throw new Error("User weight not found");
      }
    });
  return currentUserWeigh;
};
