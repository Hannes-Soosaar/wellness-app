import { pool } from "@backend/server";
import { ActivityOptions } from "@shared/types/api";
import dotenv from "dotenv";

dotenv.config();
const dbKey = process.env.DB_KEY;

export const getActiveActivityOptions = async (): Promise<ActivityOptions> => {
  const status = "active";
  try {
    const response = await pool.query(
      " SELECT type FROM activities WHERE status = $1",
      [status]
    );

    const activeOptions: ActivityOptions = {
      activities: response.rows.map((row) => row.type),
    };

    return activeOptions;
  } catch (error) {
    console.log("Error updating password", error);
    return { activities: [] };
  }
};

//TODO create objects to hold data from the front end
export const updateUserActivity = async (userId: string): Promise<boolean> => {
  if (!activity) {
    throw new Error("Activity data is required");
    return false;
  }

  try {
    const { activity } = req.body;

    // Insert the activity into the database
    await pool.query(
      "INSERT INTO user_activities (user_id, activity) VALUES ($1, $2)",
      [userId, activity]
    );

    return true;
  } catch (error) {
    console.error("Error updating user activity:", error);
    throw error;
    return false;
  }
};
