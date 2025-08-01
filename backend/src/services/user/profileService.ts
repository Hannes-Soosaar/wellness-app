import { pool } from "@backend/server";
import { ProfilePost, UserProfile } from "@shared/types/api";
import dotenv from "dotenv";

dotenv.config();

export const updateUserProfile = async (
  userProfile: UserProfile
): Promise<void> => {
  console.log("Updating user profile", userProfile);

  if (!userProfile) {
    throw new Error("Profile data is required");
  }
  if (!userProfile.userId) {
    throw new Error("No user Id provided");
  }

  const response = await pool.query(
    `INSERT INTO user_profiles (user_id, first_name, last_name, sex, age, height, weight, neck_circumference, waist_circumference)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT (user_id)
     DO UPDATE SET first_name = $2, last_name", sex = $3, age = $4, height = $5, weight = $6, neck_circumference=$7, waist_circumference= $8`,
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
      process.env.DB_KEY,
    ]
  );
};
