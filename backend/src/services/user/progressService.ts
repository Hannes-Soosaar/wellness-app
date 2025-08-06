import { UserProgressPost, ProgressPost } from "@shared/types/api";
import { pool } from "@backend/server";
import { getRandomValues } from "crypto";

export const getLastUserProgress = async (
  userId: string
): Promise<ProgressPost> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    //The user_profile only has the latest progress so no need to sort.
    const result = await pool.query(
      `
      SELECT weight, neck_circumference, waist_circumference,  FROM user_profile WHERE user_id = $1
      `,
      [userId]
    );

    if (result.rows.length === 0) {
      throw new Error("No progress found for the user");
    }
    const row = result.rows[0];
    const userProgress: ProgressPost = {
      weight: row.weight,
      neckCircumference: row.neck_circumference,
      waistCircumference: row.waist_circumference,
      date: row.date,
      note: row.note,
      hipCircumference: row.hip_circ,
    };

    return userProgress;
  } catch (error) {
    throw new Error(`Failed to fetch last user progress: ${error}`);
  }
};

export const updateUserProgress = async (
  userProgress: UserProgressPost
): Promise<void> => {
  if (!userProgress || !userProgress.userId) {
    throw new Error("User progress data is required");
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(
      `
      INSERT INTO profile_history (user_id, weight, neck_circumference, waist_circumference, hip_circumference, date, note)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      [
        userProgress.userId,
        userProgress.weight,
        userProgress.neckCircumference,
        userProgress.waistCircumference,
        userProgress.hipCircumference,
        userProgress.date,
        userProgress.note,
      ]
    );

    await client.query(
      ` UPDATE user_profile SET weight = $1, neck_circumference = $2, waist_circumference = $3, hip_circumference = $4, date = $5, note = $6 WHERE user_id = $7 AND (modified_at IS NULL OR $7 > modified_at)`,
      [
        userProgress.userId,
        userProgress.weight,
        userProgress.neckCircumference,
        userProgress.waistCircumference,
        userProgress.hipCircumference,
        userProgress.date,
        userProgress.note,
      ]
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw new Error(`Failed to update user progress: ${error}`);
  } finally {
    client.release();
  }
};
//TODO: post user progress
//TODO: get user progress history
