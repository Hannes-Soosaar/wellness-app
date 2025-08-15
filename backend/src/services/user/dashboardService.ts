import { pool } from "@backend/server";
import { UserDashboard } from "@shared/types/api";

export const getUserDashboard = async (
  userId: string
): Promise<UserDashboard> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  let userDashboardData: UserDashboard = {
    wellnessScore: 0,
    BMI: 0,
    fatPercentage: 0,
    currentWeight: 0,
    goal: "",
    goalProgress: 0,
    goalTargetValue: 0,
    goalStartValue: 0,
    goalCurrentValue: 0,
    goalStartDate: "",
    goalEndDate: "",
    progressIndicator: "",
    goalLastProgressDate: "", // Added to match the new structure
  };

  const client = await pool.connect();

  try {
    client.query("BEGIN");

    const userGoalsResult = await client.query(
      `SELECT 
      ug.goal_start_value,
      ug.goal_target_value,
      ug.goal_current_value,
      ug.progress,
      ug.end_at,
      ug.created_at,
      ug.goal_last_progress_date,
      g.description
      FROM
      user_goals ug JOIN goals g  ON ug.goal_id = g.id
      WHERE ug.user_id = $1`,
      [userId]
    );

    const goalRow = userGoalsResult.rows[0];

    console.log("Goal Row:", goalRow);

    if (goalRow) {
      userDashboardData = {
        ...userDashboardData,
        goal: goalRow.description || "",
        goalProgress: Number(goalRow.progress) || 0,
        goalTargetValue: Number(goalRow.goal_target_value) || 0,
        goalCurrentValue: Number(goalRow.goal_current_value) || 0,
        goalStartValue: Number(goalRow.goal_start_value) || 0,
        goalStartDate: goalRow.created_at?.toISOString() || "",
        goalEndDate: goalRow.end_at?.toISOString() || "",
        goalLastProgressDate: goalRow.goal_last_progress_date, //
      };
    }

    const userProfileResult = await client.query(
      `SELECT 
        user_wellness_score,
        current_weight,
        current_bmi,
        body_fat_percentage
      FROM user_profiles 
      WHERE user_id = $1`,
      [userId]
    );

    const profileRow = userProfileResult.rows[0];
    console.log("Profile Row:", profileRow);

    if (profileRow) {
      userDashboardData = {
        ...userDashboardData,
        wellnessScore: profileRow.user_wellness_score || 0,
        currentWeight: profileRow.current_weight || 0,
        BMI: profileRow.current_bmi || 0,
        fatPercentage: profileRow.body_fat_percentage || 0,
      };
    }
    client.query("COMMIT");
    return userDashboardData;
  } catch (error) {
    client.query("ROLLBACK");
    console.error("Error fetching user dashboard:", error);
    throw new Error("Failed to fetch user dashboard");
  } finally {
    client.release();
  }
};
