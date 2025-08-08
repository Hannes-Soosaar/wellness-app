import { UserProgressPost, ProgressPost } from "@shared/types/api";
import { pool } from "@backend/server";
import { BodyComposition } from "@shared/types/data";

export const getLastUserProgress = async (
  userId: string
): Promise<ProgressPost> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    //  will use the history table to get the latest progress
    const result = await pool.query(
      `
      SELECT weight, neck_circumference, waist_circumference, hip_circumference  FROM profile_history WHERE user_id = $1
      ORDER BY date DESC LIMIT 1`,
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
      hipCircumference: row.hip_circumference,
      date: row.date,
      note: row.note,
    };
    return userProgress;
  } catch (error) {
    throw new Error(`Failed to fetch last user progress: ${error}`);
  }
};

// TODO: Need to also calculate and add the BMI and body-fat percentage
export const updateUserProgress = async (
  userProgress: UserProgressPost,
  userBodyComposition: BodyComposition
): Promise<void> => {
  if (!userProgress || !userProgress.userId) {
    throw new Error("User progress data is required");
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(
      `
      INSERT INTO profile_history (user_id, weight, neck_circumference, waist_circumference, hip_circumference, date, note, body_fat_percentage, BMI)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (u date)
      `,
      [
        userProgress.userId, //1
        userProgress.weight, //2
        userProgress.neckCircumference, //3
        userProgress.waistCircumference, //4
        userProgress.hipCircumference, //5
        userProgress.date, //6
        userProgress.note, //7
        userBodyComposition.fatPercentage, //8
        userBodyComposition.BMI, //9
      ]
    );

    await client.query(
      ` UPDATE user_profile SET weight = $1,
        neck_circumference = $2,
        waist_circumference = $3,
        hip_circumference = $4,
        date = $5,
        body_fat_percentage = $6,
        current_BMI = $7,
        modified_at = CURRENT_TIMESTAMP
        WHERE user_id = $8 AND (modified_at IS NULL OR $5 > modified_at)`,
      [
        userProgress.weight, //1
        userProgress.neckCircumference, //2
        userProgress.waistCircumference, //3
        userProgress.hipCircumference, //4
        userProgress.date, //5
        userBodyComposition.fatPercentage, //6
        userBodyComposition.BMI, //7
        userProgress.userId, //8
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
