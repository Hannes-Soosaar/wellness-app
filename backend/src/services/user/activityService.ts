import { pool } from "@backend/server";
import { ActivityOptions, ActivityPost, UserActivity } from "@shared/types/api";
import { ActivityDataPoint, GraphRequest } from "@shared/types/graphs";
import dotenv from "dotenv";
import { PeriodSummary } from "@shared/types/graphs";

dotenv.config();
const dbKey = process.env.DB_KEY;

// All errors are handled in the controller.
// The activities are a history
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
  try {
    await pool.query(
      "INSERT INTO user_activities (user_id, activity_type, duration, intensity, date, note, calories_burned) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        userActivity.userId,
        userActivity.activityType,
        userActivity.activityDuration,
        userActivity.activityIntensity,
        userActivity.activityDate,
        userActivity.activityNote,
        userActivity.caloriesBurned || 0,
      ]
    );
  } catch (error) {
    console.error("Error updating user activity:", error);
    throw new Error(`Failed to update user activity: ${error}`);
  }
};

export const getUserActivities = async (
  userId: string,
  params: GraphRequest
): Promise<ActivityDataPoint[]> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  console.log("Fetching user activities for userId:", userId);
  console.log("Request parameters:", params);
  const granularity = params.granularity || "day";
  const sortOrder = params.sort?.toUpperCase() === "DESC" ? "DESC" : "ASC";
  const fromStr = params.from || "1970-01-01";
  const toStr = params.to || "9999-12-31";

  let query: { text: string; values: (string | number)[] };

  if (params.granularity === "none") {
    query = {
      text: `
      SELECT * FROM user_activities 
      WHERE user_id = $1 
      AND date between $2 AND $3 ORDER BY ${sortOrder} 
    `,
      values: [
        userId, //1
        fromStr, //2
        toStr, //3
      ],
    };
  } else {
    query = {
      text: `SELECT
          date_trunc('${granularity}', date) AS period,
          COUNT(*) AS activity_count,
          SUM(duration) AS total_duration,
          SUM(calories_burned) AS total_calories
        FROM user_activities
        WHERE user_id = $1
          AND date BETWEEN $2 AND $3
        GROUP BY period
        ORDER BY period ${sortOrder} 
    `,
      values: [
        userId, //1
        fromStr, //2
        toStr, //3
      ],
    };
  }

  try {
    const response = await pool.query(query);

    if (response.rows.length === 0) {
      return [];
    }

    return response.rows.map(
      (row) =>
        ({
          date: row.period || row.date,
          total_duration: Number(row.total_duration) || 0,
          total_calories: Number(row.total_calories) || 0,
          count: Number(row.activity_count) || 0,
        }) as ActivityDataPoint
    );
  } catch (error) {
    console.error("Error fetching user activities:", error);
    throw new Error(`Failed to fetch user activities: ${error}`);
  }
};

// this is gor the dashboard
export const getActivityPeriodSummary = async (
  userId: string
): Promise<PeriodSummary> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const client = await pool.connect();
  try {
    client.query("BEGIN");

    const responseDay = await client.query(
      `
      SELECT 
        date_trunc('day', date) AS period,
        COUNT(*) AS activity_count,
        SUM(duration) AS total_duration,
        SUM(calories_burned) AS total_calories
      FROM user_activities
      WHERE user_id = $1
      AND date::date = CURRENT_DATE
      GROUP BY period
      ORDER BY period DESC
    `,
      [userId]
    );

    const rowsDay = responseDay.rows[0];

    const dailySummary: ActivityDataPoint = {
      date: rowsDay.period,
      total_duration: rowsDay.total_duration || 0,
      total_calories: rowsDay.total_calories || 0,
      count: rowsDay.activity_count || 0,
    };

    const responseWeek = await client.query(
      `
      SELECT 
        date_trunc('week', date) AS period,
        COUNT(*) AS activity_count,
        SUM(duration) AS total_duration,
        SUM(calories_burned) AS total_calories
      FROM user_activities
      WHERE user_id = $1
      GROUP BY period
      ORDER BY period DESC
    `,
      [userId]
    );

    const rowsWeek = responseWeek.rows[0];

    const weeklySummary: ActivityDataPoint = {
      date: rowsWeek.period,
      total_duration: rowsWeek.total_duration || 0,
      total_calories: rowsWeek.total_calories || 0,
      count: rowsWeek.activity_count || 0,
    };

    const responseMonth = await client.query(
      `
      SELECT 
        date_trunc('month', date) AS period,
        COUNT(*) AS activity_count,
        SUM(duration) AS total_duration,
        SUM(calories_burned) AS total_calories
      FROM user_activities
      WHERE user_id = $1
          AND date::date >= CURRENT_DATE - interval '30 days'
          AND date::date < CURRENT_DATE
      GROUP BY period
      ORDER BY period DESC
    `,
      [userId]
    );

    const rowsMonth = responseMonth.rows[0];
    const monthlySummary: ActivityDataPoint = {
      date: rowsMonth.period,
      total_duration: rowsMonth.total_duration || 0,
      total_calories: rowsMonth.total_calories || 0,
      count: rowsMonth.activity_count || 0,
    };

    return {
      daily: dailySummary,
      weekly: weeklySummary,
      monthly: monthlySummary,
    };
  } catch (error) {
    console.error("Error fetching activity period summary:", error);
    throw new Error(`Failed to fetch activity period summary: ${error}`);
  }
};

// This is the data for the AI. Will give it the last 365 days of data to get better results
export const getRawUserActivities = async (
  userId: string
): Promise<ActivityPost[]> => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  // on years of data with 365 newest entries
  try {
    const response = await pool.query(
      `
      SELECT * FROM user_activities 
      WHERE user_id = $1 
            FROM user_activities
      WHERE user_id = $1
          AND date::date >= CURRENT_DATE - interval '365 days'
          AND date::date < CURRENT_DATE
      ORDER BY date DESC
      LIMIT 365
    `,
      [userId]
    );

    if (response.rows.length === 0) {
      return [];
    }

    return response.rows.map(
      (row) =>
        ({
          userId: row.user_id,
          activityType: row.activity_type,
          activityDuration: row.duration,
          activityIntensity: row.intensity,
          activityDate: row.date,
          activityNote: row.note,
          caloriesBurned: row.calories_burned || 0,
        }) as ActivityPost
    );
  } catch (error) {
    console.error("Error fetching raw user activities:", error);
    throw new Error(`Failed to fetch raw user activities: ${error}`);
  }
};
