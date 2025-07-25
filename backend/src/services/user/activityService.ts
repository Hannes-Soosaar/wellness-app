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

export const updateUserActivity = async (userId: string): Promise<boolean> => {
  return false;
};
