import { pool } from "@backend/server";
import { generateUserAdvice } from "./aiService";
import {
  UserPromptData,
  ProgressDataPoint,
  UserGoalDataPoint,
  UserProfile,
  ActivityDataPoint,
  UserGoalData,
} from "@backend/src/models/aiModels";

// export const createAiAdvice = async (userId: string): Promise<void> => {
//   let userData: string =
//     "I have not started any training yet, and my goal is to lose weight";
//   const createAiAdvice = await generateUserAdvice(userData);
//   if (!createAiAdvice) {
//     throw new Error("Failed to generate AI advice");
//   }

//   try {
//     const response = await pool.query(
//       `
//     INSERT INTO user_advice (user_id, advice_markdown, advice_metadata, advice_category_id, user_input)
//     VALUES ($1, $2, '{}'::jsonb, 1, $3)
//     RETURNING *
//     `,
//       [userId, createAiAdvice, JSON.stringify(userData)]
//     );

//     const advice = response.rows[0];
//     console.log("AI advice created successfully:", advice);
//     return advice;
//   } catch (error) {
//     console.error("Error creating AI advice:", error);
//     throw new Error("Failed to create AI advice");
//   }
// };

export const getUserDataForPrompt = async (
  userId: string,
  from: string,
  to: string
): Promise<UserPromptData> => {
  if (!from || !to) {
    //  by default send data for one month
    const today = new Date();
    to = today.toISOString().split("T")[0];
    const fromTime = new Date(today);
    fromTime.setDate(fromTime.getDate() - 30);
    from = fromTime.toISOString().split("T")[0];
  }

  if (!userId) {
    throw new Error("User ID is required to fetch user data");
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Fetch User Profile Dateless
    const profileResult = await client.query(
      `
      SELECT user_id, age, current_weight, current_bmi, body_fat_percentage, current_pushups, current_walking_minutes, neck_circumference, waist_circumference, hip_circumference
      FROM user_profiles
      WHERE user_id = $1
    `,
      [userId]
    );

    let profile: UserProfile = {
      userId: userId,
      age: 0,
      weight: 0,
      bmi: 0,
      fatPercentage: 0,
    };

    if (profileResult.rows.length > 0) {
      const row = profileResult.rows[0];
      profile = {
        userId: row.user_id,
        age: row.age,
        weight: row.current_weight ?? row.weight ?? 0,
        bmi: row.bmi,
        fatPercentage: row.body_fat_percentage,
        pushups: row.current_pushups,
        walk: row.current_walking_minutes,
        neckCircumference: row.neck_circumference,
        waistCircumference: row.waist_circumference,
        hipCircumference: row.hip_circumference,
      };
    }

    // Fetch User Goal dateless
    const goalResult = await client.query(
      `
  SELECT 
    g.title AS goal_title,
    ug.goal_target_value,
    ug.goal_start_value,
    ug.goal_current_value,
    ug.goal_last_progress_date,
    ug.created_at,
    ug.end_at
  FROM user_goals ug
  JOIN goals g ON g.id = ug.goal_id
  WHERE ug.user_id = $1
  ORDER BY ug.created_at DESC
  LIMIT 1
  `,
      [userId]
    );
    let goals: UserGoalData = {
      userGoal: "No goal set",
      goalTargetValue: 0,
      goalCurrentValue: 0,
      goalStartValue: 0,
      startAt: "",
      endAt: "",
    };

    if (goalResult.rows.length > 0) {
      const row = goalResult.rows[0];

      goals = {
        userGoal: row.goal_title, // mapped from title
        goalTargetValue: Number(row.goal_target_value),
        goalCurrentValue: Number(row.goal_current_value),
        goalStartValue: Number(row.goal_start_value),
        startAt: row.start_at?.toISOString?.() || "",
        endAt: row.end_at?.toISOString?.() || "",
      };
    }

    // Fetch Goal History
    const goalHistoryResult = await client.query(
      `
  SELECT 
    gh.create_at::date AS date,
    gh.goal_value AS goal_current_value,
    g.title AS goal_title
  FROM goal_history gh
  JOIN user_goals ug ON ug.id = gh.user_goal_id
  JOIN goals g ON g.id = ug.goal_id
  WHERE ug.user_id = $1
    AND gh.create_at::date BETWEEN $2::date AND $3::date
    AND g.title = $4
  ORDER BY gh.create_at ASC
    `,
      [userId, from, to, goals.userGoal]
    );
    const goalHistory: UserGoalDataPoint[] = goalHistoryResult.rows.map(
      (row) => ({
        date: row.date,
        goalCurrentValue: Number(row.goal_current_value),
        goalTitle: row.goal_title,
      })
    );

    const progressDataResult = await client.query(
      `
      SELECT date, weight, BMI, wellness_score, body_fat_percentage, max_pushups, max_walking_time , neck_circumference, waist_circumference, hip_circumference
      FROM profile_history
      WHERE user_id = $1
      AND date::date BETWEEN $2::date AND $3::date
      ORDER BY date ASC
    `,
      [userId, from, to]
    );

    const progressData: ProgressDataPoint[] = progressDataResult.rows.map(
      (row) => ({
        data: row.data, // ensure YYYY-MM-DD
        weight: row.weight != null ? Number(row.weight) : undefined,
        bmi: row.BMI != null ? Number(row.BMI) : undefined,
        wellnessScore:
          row.wellness_score != null ? Number(row.wellness_score) : undefined,
        fatPercentage:
          row.body_fat_percentage != null
            ? Number(row.body_fat_percentage)
            : undefined,
        pushups: row.max_pushups != null ? Number(row.max_pushups) : undefined,
        walk:
          row.max_walking_time != null
            ? Number(row.max_walking_time)
            : undefined,
        neckCircumference:
          row.neck_circumference != null
            ? Number(row.neck_circumference)
            : undefined,
        waistCircumference:
          row.waist_circumference != null
            ? Number(row.waist_circumference)
            : undefined,
        hipCircumference:
          row.hip_circumference != null
            ? Number(row.hip_circumference)
            : undefined,
      })
    );

    const activityDataResult = await client.query(
      `
      SELECT date, duration, activity_type, calories_burned
      FROM user_activities
      WHERE user_id = $1
      AND date::date BETWEEN $2::date AND $3::date
      ORDER BY date ASC
    `,
      [userId, from, to]
    );

    const activityData: ActivityDataPoint[] = activityDataResult.rows.map(
      (row) => ({
        date: row.date?.toISOString?.().split("T")[0] || row.date, // YYYY-MM-DD
        total_duration: row.duration != null ? Number(row.duration) : 0,
        activity_type: row.activity_type,
        calories_burned:
          row.calories_burned != null ? Number(row.calories_burned) : 0,
      })
    );

    const restrictionsResult = await client.query(
      `
  SELECT rt.restriction
  FROM user_restrictions ur
  JOIN restriction_types rt ON rt.id = ur.type_id
  WHERE ur.user_id = $1
    AND rt.status = 'active'
      `,
      [userId]
    );

    const restrictions = restrictionsResult.rows.map(
      (row) => row.restriction
    ) as string[];

    await client.query("COMMIT");

    const userPromptData: UserPromptData = {
      profile,
      goals,
      goalHistory,
      progressData,
      activityData,
      restrictions,
    };

    return userPromptData;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error fetching user data for prompt:", error);
    return {
      profile: {} as UserProfile,
      goals: {} as UserGoalData,
      goalHistory: [],
      progressData: [],
      activityData: [],
      restrictions: [],
    };
  } finally {
    client.release();
  }
};
