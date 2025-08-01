import { pool } from "@backend/server";
import { ProfilePost, UserDashboard, UserProfile } from "@shared/types/api";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.DB_KEY) {
  console.error("Missing crypto key for DB");
}
const dbKey = process.env.DB_KEY;

export const updateUserProfile = async (
  userProfile: UserProfile
): Promise<void> => {
  console.log("Updating user profile", userProfile);

  if (!userProfile) {
    console.error("No user profile data provided");
    throw new Error("Profile data is required");
  }
  if (!userProfile.userId) {
    console.error("No user Id provided");
    throw new Error("No user Id provided");
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(
      `INSERT INTO user_profiles (
    user_id,
    first_name,
    last_name,
    sex,
    age,
    height,
    current_weight,
    neck_circumference,
    waist_circumference,
    hip_circumference,
    current_BMI,
    body_fat_percentage)
    VALUES
    ($1, pgp_sym_encrypt($2, $11),pgp_sym_encrypt($3, $11),
    $4,$5,$6,$7,$8,$9,$10,$12,$13) ON CONFLICT (user_id)
    DO UPDATE SET
    first_name = pgp_sym_encrypt($2, $11),
    last_name=pgp_sym_encrypt($3, $11) ,
    sex = $4,
    age = $5,
    height = $6,
    current_weight = $7,
    neck_circumference=$8,
    waist_circumference= $9,
    hip_circumference = $10,
    current_BMI = $12,
    body_fat_percentage = $13`,
      [
        userProfile.userId,
        userProfile.firstName,
        userProfile.lastName,
        userProfile.sex,
        userProfile.age,
        userProfile.height,
        userProfile.weight,
        userProfile.neckCircumference,
        userProfile.waistCircumference,
        userProfile.hipCircumference,
        dbKey,
        userProfile.BMI,
        userProfile.fatPercentage,
      ]
    );
    // From the profile update window the history gets the posting time stamp, when adding from the progress window a custom time for the entry can be added
    await client.query(
      `
        INSERT INTO profile_history (
        user_id,
        body_fat_percentage,
        neck_circumference,
        waist_circumference,
        hip_circumference,
        weight,
        bmi
        ) VALUES
        ($1, $2, $3, $4, $5, $6, $7)
        `,
      [
        userProfile.userId,
        userProfile.fatPercentage,
        userProfile.neckCircumference,
        userProfile.waistCircumference,
        userProfile.hipCircumference,
        userProfile.weight,
        userProfile.BMI,
      ]
    );

    await client.query("COMMIT");
    console.log("User profile updated successfully");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Failed to update user profile:", error);
    throw new Error(`Failed to update user profile: ${error}`);
  } finally {
    client.release();
  }
  console.log("User profile updated successfully");
};

export const updateUserProgress = async (): Promise<void> => {
  // Update the user History and  the User Profile with new values

  console.log("User progress updated");
};

export const getUserDashboard = async (
  userId: string
): Promise<UserDashboard> => {
  let userDashboard: UserDashboard = {};
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const userProfile = await client.query(
      `SELECT * FROM user_profiles WHERE user_id = $1`,
      [userId]
    );

    const userGoal = await client.query(
      `SELECT * FROM user_goals WHERE user_id = $1`,
      [userId]
    );

    await client.query("COMMIT");
  } catch (error) {
    client.query("ROLLBACK");
    console.error("Failed to get user dashboard:", error);
    throw new Error(`Failed to get user dashboard: ${error}`);
  }

  return userDashboard;
};
