import { pool } from "@backend/server";
import dotenv from "dotenv";
import { userData } from "@backend/src/models/userModel";
import { response } from "express";
import { throwDeprecation } from "process";
import { UserSettings } from "@shared/types/api";

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

export const getUserWeightById = async (userId: string): Promise<number> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  let currentUserWeigh = 0;
  try {
    const result = await pool.query(
      "SELECT current_weight FROM user_profile WHERE user_id = $1",
      [userId]
    );
    if (result.rows.length > 0) {
      currentUserWeigh = result.rows[0].current_weight;
    } else {
      throw new Error("User weight not found");
    }
    return currentUserWeigh;
  } catch (error) {
    console.error("Error fetching user weight:", error);
    throw new Error("Failed to fetch user weight");
  }
};

export const getUserSettings = async (
  userId: string
): Promise<UserSettings> => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  try {
    const result = await pool.query(
      "SELECT * FROM user_settings WHERE user_id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      throw new Error("User settings not found");
    }

    return {
      mfa_enabled: result.rows[0].mfa_enabled,
      email_notifications: result.rows[0].email_notifications,
      notification_active: result.rows[0].notification_active,
      privacy_accepted: result.rows[0].privacy_accepted,
      cookies_allowed: result.rows[0].cookie_allowed,
      ai_enabled: result.rows[0].ai_enabled,
    };
  } catch (error) {
    console.error("Error fetching user settings:", error);
    throw error;
  }
};

export const updateUserSettings = async (
  userId: string,
  settings: UserSettings
): Promise<void> => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  if (!settings) {
    throw new Error("Settings data is required");
  }

  try {
    await pool.query(
      `
      UPDATE user_settings
      SET mfa_enabled = $1,
          email_notifications = $2,
          notification_active = $3,
          privacy_accepted = $4,
          cookies_allowed = $5,
          ai_enabled = $6
      WHERE user_id = $7
    `,
      [
        settings.mfa_enabled,
        settings.email_notifications,
        settings.notification_active,
        settings.privacy_accepted,
        settings.cookies_allowed,
        settings.ai_enabled,
        userId,
      ]
    );
  } catch (error) {
    console.error("Failed to update user settings:", error);
    throw error;
  }
};
