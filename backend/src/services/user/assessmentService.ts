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
  userId
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

    console.log("User assessment values fetched:", response.rows);

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
