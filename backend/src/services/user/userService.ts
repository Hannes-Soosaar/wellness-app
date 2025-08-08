import { pool } from "@backend/server";
import dotenv from "dotenv";
import { userData } from "@backend/src/models/userModel";
import { UserSettings, UserProfile } from "@shared/types/api";
import { UserSexAndHeight } from "@shared/types/api";

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

export const getSexAndHeightByUserId = async (
  userId: string
): Promise<UserSexAndHeight> => {
  if (!userId) {
    throw new Error("No user ID provided");
  }

  try {
    const result = await pool.query(
      `
      SELECT
      sex, height FROM user_profiles WHERE user_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      throw new Error("User not found");
    }

    const row = result.rows[0];
    const userSexAndHeight: UserSexAndHeight = {
      sex: row.sex,
      height: row.height,
    };
    return userSexAndHeight;
  } catch (error) {
    throw new Error(`Failed to fetch user, ${error}`);
  }
};

export const getUserProfileById = async (
  userId: string
): Promise<UserProfile> => {
  if (!userId) {
    throw new Error("No user ID provided");
  }

  try {
    const result = await pool.query(
      `
      SELECT
      pgp_sym_decrypt(first_name,$2) AS first_name,
      pgp_sym_decrypt(last_name,$2) AS last_name,
      sex,
      age,
      height,
      neck_circumference,
      waist_circumference,
      hip_circumference,
      body_fat_percentage,
      current_weight,
      current_BMI
      FROM user_profiles WHERE user_id = $1`,
      [
        userId, //1
        dbKey, //2
      ]
    );
    if (result.rows.length === 0) {
      console.log(" No profile found!");
      throw new Error("User profile not found");
    }
    const row = result.rows[0]; // Placeholder, calculate wellness score if needed

    return {
      firstName: row.first_name,
      lastName: row.last_name,
      sex: row.sex,
      age: row.age,
      height: row.height,
      weight: row.current_weight,
      neckCircumference: row.neck_circumference,
      waistCircumference: row.waist_circumference,
      hipCircumference: row.hip_circumference,
      BMI: row.current_BMI,
      fatPercentage: row.body_fat_percentage,
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error(`Failed to fetch user profile, ${error}`);
  }
};
