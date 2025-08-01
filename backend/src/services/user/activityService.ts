import { pool } from "@backend/server";
import { ActivityOptions, UserActivity } from "@shared/types/api";
import dotenv from "dotenv";

dotenv.config();
const dbKey = process.env.DB_KEY;

// All errors are handled in the controller.

export const getActiveActivityOptions = async (): Promise<ActivityOptions> => {
  const status = "active";
  const response = await pool.query(
    " SELECT type FROM activities WHERE status = $1",
    [status]
  );
  const activeOptions: ActivityOptions = {
    activities: response.rows.map((row) => row.type),
  };
  return activeOptions;
};

export const updateUserActivity = async (
  userActivity: UserActivity
): Promise<void> => {
  console.log("Updating user activity", userActivity);
  if (!userActivity) {
    throw new Error("Activity data is required");
  }
  if (!userActivity.userId) {
    throw new Error("No user Id provided");
  }

  // Insert the activity into the database
  await pool.query(
    "INSERT INTO user_activities (user_id, activity_type, duration, intensity, date, note) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      userActivity.userId,
      userActivity.activityType,
      userActivity.activityDuration,
      userActivity.activityIntensity,
      userActivity.activityDate,
      userActivity.activityNote,
    ]
  );
};
