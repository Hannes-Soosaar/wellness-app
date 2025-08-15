import { pool } from "@backend/server";
import {
  AssessmentOption,
  AssessmentOptions,
  UserAssessments,
  userAssessment,
  ResponseData,
} from "@shared/types/api";

export const getAssessmentOptions = async (): Promise<AssessmentOptions> => {
  try {
    const response = await pool.query(
      "SELECT category, value, title, description FROM assessment_criteria"
    );

    if (response.rows.length === 0) {
      throw new Error("No assessment options found for the user");
    }
    const options: AssessmentOption[] = response.rows.map((row) => ({
      category: row.category,
      value: row.value,
      title: row.title,
      description: row.description,
    }));
    return { options };
  } catch (error) {
    console.error("Error fetching assessment options:", error);
    throw new Error("Failed to fetch assessment options");
  }
};

export const getUserAssessmentValues = async (
  userId: string
): Promise<UserAssessments> => {
  if (!userId) {
    console.log("No user ID provided");
    throw new Error("No user ID provided");
  }

  try {
    const response = await pool.query(
      `SELECT
    ua.user_id,
    ua.user_wellness_score,
    ac.category,
    ac.value,
    ac.title,
    ac.description
FROM user_assessment ua
JOIN assessment_criteria ac
    ON ua.assessment_criteria_id = ac.id
WHERE ua.user_id = $1;`,
      [userId]
    );

    if (response.rows.length === 0) {
      return { assessments: [] };
    }

    if (response.rows.length === 0) {
      return { assessments: [] };
    }

    const assessments: userAssessment[] = response.rows.map((row) => ({
      category: row.category,
      value: row.value,
    }));
    return { assessments };
  } catch (error) {
    console.error("Error fetching user assessments:", error);
    throw new Error("Failed to fetch user assessments");
  }
};

export const updateUserAssessment = async (
  userId: string,
  userAssessments: UserAssessments
): Promise<void> => {
  if (!userId) {
    throw new Error("No user ID provided");
  }

  if (!userAssessments || !userAssessments.assessments) {
    throw new Error("No assessments provided");
  }

  const client = await pool.connect();
  client.query("BEGIN");
  try {
    await client.query(`DELETE FROM user_assessment WHERE user_id = $1`, [
      userId,
    ]);
    await client.query(
      `
  INSERT INTO user_assessment (user_id, assessment_criteria_id)
  SELECT
    $1 AS user_id,
    ac.id
  FROM
    jsonb_to_recordset($2::jsonb)
      AS r(category text, value text)
    JOIN assessment_criteria ac
      ON ac.category = r.category
      AND ac.value = r.value
  `,
      [userId, JSON.stringify(userAssessments.assessments)]
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Failed to update user assessment:", error);
    throw new Error(`Failed to update user assessment: ${error}`);
  } finally {
    client.release();
    setUserAssessmentScore(userId);
  }
  console.log("User assessment updated successfully");
};

// This could be added to the user_profile  table, but there was a laps in logic error when building the user_assessment table
export const setUserAssessmentScore = async (userId: string): Promise<void> => {
  if (!userId) {
    throw new Error("No user ID provided");
  }

  try {
    const response = await pool.query(
      `WITH score_cte AS (
        SELECT COALESCE(SUM(ac.score), 0) AS total_score
        FROM user_assessment ua
        JOIN assessment_criteria ac
          ON ua.assessment_criteria_id = ac.id
        WHERE ua.user_id = $1
      )
      UPDATE user_profiles
      SET user_wellness_score = score_cte.total_score,
          modified_at = CURRENT_TIMESTAMP
      FROM score_cte
      WHERE user_id = $1
      RETURNING score_cte.total_score AS total_score`,
      [userId]
    );
    if (response.rows.length === 0) {
      console.log("No rows updated for user assessment score");
    }
    console.log(
      "User assessment score updated successfully:",
      response.rows[0].total_score
    );
  } catch (error) {
    console.error("Error fetching user assessment score:", error);
    throw new Error("Failed to fetch user assessment score");
  }
};
