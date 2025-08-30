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
INSERT INTO profile_history (
  user_id,
  weight,
  neck_circumference,
  waist_circumference,
  hip_circumference,
  date,
  note,
  body_fat_percentage,
  BMI
) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
ON CONFLICT (user_id, date)
DO UPDATE SET
  weight = EXCLUDED.weight,
  neck_circumference = EXCLUDED.neck_circumference,
  waist_circumference = EXCLUDED.waist_circumference,
  hip_circumference = EXCLUDED.hip_circumference,
  note = EXCLUDED.note,
  body_fat_percentage = EXCLUDED.body_fat_percentage,
  BMI = EXCLUDED.BMI;
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
      text: `
      SELECT *
      FROM profile_history
      WHERE user_id = $1
        AND date BETWEEN $2 AND $3
      ORDER BY date DESC;
    `,
      values: [
        userId, //1
        fromStr, //2
        toStr, //3
      ],
    };
  } else {
    query = {
      text: `
      (
        SELECT *
        FROM profile_history
        WHERE user_id = $1
          AND date BETWEEN $2 AND $3
        ORDER BY date ASC
        LIMIT 1
      )
      UNION ALL
      (
        SELECT *
        FROM profile_history
        WHERE user_id = $1
          AND date BETWEEN $2 AND $3
        ORDER BY date DESC
        LIMIT 1
      );
    `,
      values: [
        userId, //1
        fromStr, //2
        toStr, //3
      ],
    };
  }

  console.log("Executing query:", query);

  try {
    const result = await pool.query(query.text, query.values);
    if (params.granularity === "none" && result.rows.length > 0) {
      const rawUserProgressHistory = result.rows.map((row) => ({
        weight: Number(row.weight) || 0,
        neckCircumference: Number(row.neck_circumference),
        waistCircumference: Number(row.waist_circumference),
        hipCircumference: Number(row.hip_circumference),
        date: row.date,
        fatPercentage: Number(row.body_fat_percentage),
        bmi: Number(row.bmi) || 0,
        wellnessScore: Number(row.wellness_score),
        pushups: Number(row.max_pushups) || 0,
        walk: Number(row.max_walking_time) || 0,
      }));
      console.log("Raw user progress history:", rawUserProgressHistory);
      return rawUserProgressHistory;
    }
    if (result.rows.length === 2 && params.granularity !== "none") {
      //There is some cheating going on here as this returns a single object and of a summary type, so Ideally it would be good to have a new interface for the summary
      const summary = computeProgressSummary(result.rows[1], result.rows[0]);
      console.log("The Summary for ");
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

  try {
    const result = await pool.query(
      `
SELECT 
  weight,
  neck_circumference,
  waist_circumference,
  hip_circumference,
  max_pushups,
  max_walking_time,
  "date",
  body_fat_percentage AS fat_percentage,
  bmi,
  wellness_score
FROM profile_history
WHERE user_id = $1
ORDER BY "date" ASC;
  `,
      [userId]
    );

    //       AND "date"::date BETWEEN $2::date AND $3::date
    // ORDER BY "date" DESC
    // LIMIT 365;
    console.log("Raw user progress history query result:", result);

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
function computeProgressSummary(dataFrom: any, dataTo: any): ProgressDataPoint {
  if (!dataFrom || !dataTo) {
    throw new Error("Both data points are required for summary computation");
  }
  console.log("Computing progress summary from:", dataFrom, "to:", dataTo);

  console.log("First data point:", dataFrom);
  console.log("Last data point:", dataTo);

  const summary: ProgressDataPoint = {
    date: dataTo.date,
    weight: dataTo.weight - dataFrom.weight,
    bmi: dataTo.bmi - dataFrom.bmi,
    fatPercentage: dataTo.body_fat_percentage - dataFrom.body_fat_percentage,
    pushups: dataTo.max_pushups - dataFrom.max_pushups,
    walk: dataTo.max_walking_time - dataFrom.max_walking_time,
    neckCircumference: dataTo.neck_circumference - dataFrom.neck_circumference,
    waistCircumference:
      dataTo.waist_circumference - dataFrom.waist_circumference,
    hipCircumference: dataTo.hip_circumference - dataFrom.hip_circumference,
    wellnessScore: dataTo.wellness_score - dataFrom.wellness_score,
  };

  return summary;
}
