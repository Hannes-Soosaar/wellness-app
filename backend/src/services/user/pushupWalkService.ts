import { pool } from "@backend/server";
import { io } from "@backend/server";
import { PushupAndWalk } from "@shared/types/api";

export const getPushupsWalk = async (
  userId: string
): Promise<PushupAndWalk> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const response = await pool.query(
      `
        SELECT current_pushups, current_walking_minutes FROM user_profiles where user_id = $1`,
      [userId]
    );

    if (response.rows.length === 0) {
      throw new Error("No pushups and walk data found for the user");
    }
    const row = response.rows[0];
    // This is the data structure we expect to return just making it shorter
    return {
      currentPushups: row.current_pushups,
      currentWalkingMinutes: row.current_walking_minutes,
    };
  } catch (error) {
    console.log("Error fetching pushups and walk data:", error);
    throw new Error(`Failed to fetch pushups and walk data: ${error}`);
  }
};

export const updatePushupsWalk = async (
  userId: string,
  pushupAndWalkData: PushupAndWalk
): Promise<void> => {
  if (!pushupAndWalkData) {
    throw new Error("Pushup and walk data is required");
  }

  console.log("userId:", userId);

  const { currentPushups, currentWalkingMinutes } = pushupAndWalkData;

  let error: string = "";

  if (currentPushups == null) {
    error += "Current pushups cannot be null. " + "\n";
  }

  if (currentWalkingMinutes == null) {
    error += "Current walking minutes cannot be null. " + "\n";
  }

  if (error) {
    throw new Error(error);
  }

  try {
    await pool.query(
      `
        UPDATE user_profiles
        SET current_pushups = CASE WHEN $1>= 0 THEN $1 ELSE current_pushups END, current_walking_minutes = CASE WHEN $2 >= 0 THEN $2 ELSE current_walking_minutes END,
        modified_at = NOW()
        WHERE user_id = $3 `,
      [currentPushups, currentWalkingMinutes, userId]
    );

    await pool.query(
      `
      INSERT into profile_history (user_id, pushups, walking_minutes) VALUES ($1, $2, $3)
      `,
      [userId, currentPushups, currentWalkingMinutes]
    );
  } catch (error) {
    console.error("Error updating pushups and walk data:", error);
    throw new Error(`Failed to update pushups and walk data: ${error}`);
  }
};
