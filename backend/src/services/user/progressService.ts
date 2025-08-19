import { UserProgressPost, ProgressPost } from "@shared/types/api";
import { pool } from "@backend/server";
import { BodyComposition } from "@shared/types/data";
import { ProgressDataPoint, GraphRequest } from "@shared/types/graphs";

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
      SELECT weight, neck_circumference, waist_circumference, hip_circumference, date, note FROM profile_history WHERE user_id = $1
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
  userId: string,
  userProgress: ProgressPost,
  userBodyComposition: BodyComposition
): Promise<void> => {
  console.log("Updating user progress :", userProgress);

  if (!userProgress || !userId) {
    throw new Error("User progress data is required");
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(
      `
      INSERT INTO profile_history (user_id, weight, neck_circumference, waist_circumference, hip_circumference, date, note, body_fat_percentage, BMI)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [
        userId, //1
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
      ` UPDATE user_profiles SET current_weight = $1,
        neck_circumference = $2,
        waist_circumference = $3,
        hip_circumference = $4,
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
        userId, //8
      ]
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.log("Failed to update user progress:", error);
    throw new Error(`Failed to update user progress`);
  } finally {
    client.release();
  }
};

export const getUserProgressHistory = async (
  userId: string,
  params: GraphRequest
): Promise<ProgressDataPoint[]> => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  console.log("Fetching user progress history for userId:", userId);

  const granularity = params.granularity || "day";
  // const sortOrder = params.sort?.toUpperCase() === "DESC" ? "DESC" : "ASC";
  const fromStr = params.from || "1970-01-01";
  const toStr = params.to || "9999-12-31";

  let query: { text: string; values: (string | number)[] };

  if (params.granularity === "none") {
    query = {
      text: `WITH daily_ranked AS (
    SELECT
        user_id,
        date::date AS day,
        weight,
        bmi,
        body_fat_percentage,
        max_pushups,
        max_walking_time,
        neck_circumference,
        waist_circumference,
        hip_circumference,
        wellness_score,
        created_at,
        ROW_NUMBER() OVER (PARTITION BY date::date ORDER BY created_at DESC) AS rn
    FROM profile_history
    WHERE user_id = $1
      AND date BETWEEN $2 AND $3
)
SELECT
    day,
    COALESCE(MAX(weight) FILTER (WHERE weight != 0), 0) AS weight,
    COALESCE(MAX(bmi) FILTER (WHERE bmi != 0), 0) AS bmi,
    COALESCE(MAX(body_fat_percentage) FILTER (WHERE body_fat_percentage != 0), 0) AS fatPercentage,
    COALESCE(MAX(max_pushups) FILTER (WHERE max_pushups != 0), 0) AS pushups,
    COALESCE(MAX(max_walking_time) FILTER (WHERE max_walking_time != 0), 0) AS walk,
    COALESCE(MAX(neck_circumference) FILTER (WHERE neck_circumference != 0), 0) AS neckCircumference,
    COALESCE(MAX(waist_circumference) FILTER (WHERE waist_circumference != 0), 0) AS waistCircumference,
    COALESCE(MAX(hip_circumference) FILTER (WHERE hip_circumference != 0), 0) AS hipCircumference,
    COALESCE(MAX(wellness_score) FILTER (WHERE wellness_score != 0), 0) AS wellnessScore
FROM daily_ranked
GROUP BY day
ORDER BY day;`,
      values: [
        userId, //1
        fromStr, //2
        toStr, //3
      ],
    };
  } else {
    query = {
      text: `WITH first_day AS (
        SELECT MIN(date::date) as date
        FROM profile_history
        WHERE user_id = $1 AND date BETWEEN $2 AND $3
      ),
      last_day AS (
        SELECT MAX(date::date) as date
        FROM profile_history
        WHERE user_id = $1 AND date BETWEEN $2 AND $3
      ),
      days AS (
        SELECT date FROM first_day
        UNION ALL
        SELECT date FROM last_day
      )
      SELECT DISTINCT ON (ph.date::date)
        ph.date::date as date,
        ph.weight,
        ph.BMI as bmi,
        ph.body_fat_percentage as fatPercentage,
        ph.max_pushups as pushups,
        ph.max_walking_time as walk,
        ph.neck_circumference as neckCircumference,
        ph.waist_circumference as waistCircumference,
        ph.hip_circumference as hipCircumference,
        ph.wellness_score as wellnessScore
      FROM profile_history ph
      JOIN days d ON ph.date::date = d.date
      WHERE ph.user_id = $1
        AND (
          ph.weight != 0 OR ph.BMI != 0 OR ph.body_fat_percentage != 0 OR
          ph.max_pushups != 0 OR ph.max_walking_time != 0 OR
          ph.neck_circumference != 0 OR ph.waist_circumference != 0 OR
          ph.hip_circumference != 0 OR ph.wellness_score != 0
        )
      ORDER BY ph.date::date, ph.date DESC`,
      values: [
        userId, //1
        fromStr, //2
        toStr, //3
      ],
    };
  }

  try {
    const result = await pool.query(query.text, query.values);
    if (params.granularity === "none" && result.rows.length > 0) {
      const rawUserProgressHistory = result.rows.map((row) => ({
        weight: Number(row.weight) || 0,
        neckCircumference: Number(row.neckCircumference) || 0,
        waistCircumference: Number(row.waistCircumference) || 0,
        hipCircumference: Number(row.hipCircumference) || 0,
        date: row.date,
        fatPercentage: Number(row.fatPercentage) || 0,
        bmi: Number(row.bmi) || 0,
        wellnessScore: Number(row.wellnessScore) || 0,
        pushups: Number(row.pushups) || 0,
        walk: Number(row.walk) || 0,
      }));
      console.log("Raw user progress history:", rawUserProgressHistory);
      return rawUserProgressHistory;
    }
    if (result.rows.length === 2 && params.granularity !== "none") {
      //There is some cheating going on here as this returns a single object and of a summary type, so Ideally it would be good to have a new interface for the summary
      const summary = computeProgressSummary(result.rows[1], result.rows[0]);
      return [summary];
    }
    return [];
  } catch (error) {
    console.error("Error fetching user progress history:", error);
    throw new Error(`Failed to fetch user progress history: ${error}`);
  }
};

// This is mean for AI consumption
export const geRawUserProgressHistory = async (
  userId: string
): Promise<ProgressDataPoint[]> => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  // on year of data with 365 newest entries
  try {
    const result = await pool.query(
      `
      SELECT weight, neck_circumference, waist_circumference, hip_circumference,max_pushups,max_walking_time, date, body_fat_percentage, BMI, wellness_score FROM profile_history
      WHERE user_id = $1
      AND date::date >= CURRENT_DATE - interval '365 days'
      AND date::date < CURRENT_DATE
      ORDER BY date DESC LIMIT 365`,
      [userId]
    );

    if (result.rows.length === 0) {
      throw new Error("No progress history found for the user");
    }
    const rawUserProgressHistory = result.rows.map((row) => ({
      weight: Number(row.weight) || 0,
      neckCircumference: Number(row.neck_circumference) || 0,
      waistCircumference: Number(row.waist_circumference) || 0,
      hipCircumference: Number(row.hip_circumference) || 0,
      date: row.date,
      fatPercentage: Number(row.body_fat_percentage) || 0,
      bmi: Number(row.BMI) || 0,
      wellnessScore: Number(row.wellness_score) || 0,
      pushups: Number(row.max_pushups) || 0,
      walk: Number(row.max_walking_time) || 0,
    }));

    return rawUserProgressHistory;
  } catch (error) {
    console.error("Error fetching raw user progress history:", error);
    throw new Error(`Failed to fetch raw user progress history: ${error}`);
  }
};

// this will compute the change between two days.
function computeProgressSummary(
  dataFrom: ProgressDataPoint,
  dataTo: ProgressDataPoint
): ProgressDataPoint {
  if (!dataFrom || !dataTo) {
    throw new Error("Both data points are required for summary computation");
  }
  console.log("Computing progress summary from:", dataFrom, "to:", dataTo);

  const first = dataFrom;
  const last = dataTo;

  return {
    date: last.date,
    weight: last.weight - first.weight,
    bmi: last.bmi - first.bmi,
    fatPercentage: last.fatPercentage - first.fatPercentage,
    pushups: last.pushups - first.pushups,
    walk: last.walk - first.walk,
    neckCircumference: last.neckCircumference - first.neckCircumference,
    waistCircumference: last.waistCircumference - first.waistCircumference,
    hipCircumference: last.hipCircumference - first.hipCircumference,
    wellnessScore: last.wellnessScore - first.wellnessScore,
  };
}
