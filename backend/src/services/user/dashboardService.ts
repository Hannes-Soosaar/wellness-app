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
  };

  //   export interface UserDashboard {
  //   wellnessScore: number;
  //   BMI: number;
  //   fatPercentage: number;
  //   currentWeight: number;
  //   goal: string;
  //   goalProgress: number;
  //   goalTargetValue: number;
  //   goalStartValue: number;
  //   goalCurrentValue: number;
  //   goalStartDate: string;
  //   goalEndDate: string;
  //   progressIndicator: string; // Milestone or progress indicator %
  // }

  const client = await pool.connect();

  try {
    client.query("BEGIN");
    // fetch user_goal_ progress, target value, start value, end Data,
    // fetch goal  description by goal_id
    const userGoalsResult = await client.query(
      "SELECT ug.goal_start_value, ug.goal_target_value, ug.progress, ug.end_at, ug.created_at, g.description FROM user_goals ug JOIN goals g  ON ug.goal_id = g.id WHERE ug.user_id = $1",
      [userId]
    );

    if (userGoalsResult.rows.length > 0) {
      const {
        goal_start_value,
        goal_target_value,
        progress,
        end_at,
        created_at,
        description,
      } = userGoalsResult.rows[0];

      userDashboardData = {
        ...userDashboardData, // keep defaults
        goal: description || "",
        goalProgress: Number(progress) || 0,
        goalTargetValue: Number(goal_target_value) || 0,
        goalStartDate: created_at?.toISOString() || "",
        goalEndDate: end_at?.toISOString() || "",
        progressIndicator: "", //
      };
    }

    //   const userData= await client.query(
    //   "SELECT , end_at"

    // // const userGoals = userGoalsResult.rows;

    // client.query("COMMIT");

    return userDashboardData;
  } catch (error) {
    client.query("ROLLBACK");
    console.error("Error fetching user dashboard:", error);
    throw new Error("Failed to fetch user dashboard");
  } finally {
    client.release();
  }
};
