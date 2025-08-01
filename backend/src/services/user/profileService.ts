import { pool } from "@backend/server";
import { ProfilePost, UserProfile } from "@shared/types/api";
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

  const response = await pool.query(
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
    hip_circumference)
    VALUES
    ($1, pgp_sym_encrypt($2, $11),pgp_sym_encrypt($3, $11),
    $4,$5,$6,$7,$8,$9,$10) ON CONFLICT (user_id)
    DO UPDATE SET
    first_name = pgp_sym_encrypt($2, $11),
    last_name=pgp_sym_encrypt($3, $11) ,
    sex = $4,
    age = $5,
    height = $6,
    current_weight = $7,
    neck_circumference=$8,
    waist_circumference= $9,
    hip_circumference = $10`,
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
    ]
  );

  console.log("Profile updated successfully", response);
  if (response.rowCount === 0) {
    throw new Error("Failed to update profile");
  }
};
