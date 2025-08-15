import { pool } from "@backend/server";
import { GoalPost, GoalData, UserGoal, AvailableGoal } from "@shared/types/api";

export const getGoals = async (userId: string): Promise<GoalData> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const client = await pool.connect();

  try {
    client.query("BEGIN");

    const result = await client.query(
      "SELECT * FROM user_goals WHERE user_id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      const userGoal: UserGoal = {
        goal_id: 0,
        end_date: "",
        target_value: 0,
      };
    }
    // how to proper assign the result to the userGoal
    const userGoal = {
      goal_id: result.rows[0]?.goal_id || 0,
      end_date: result.rows[0]?.end_date || "",
      target_value: result.rows[0]?.target_value || 0,
    };

    // No need to map could just say the query returns the type of <availableGoals>
    const availableGoalsResult = await client.query(
      "SELECT id, category, title, description FROM goals"
    );

    const availableGoals: AvailableGoal[] =
      availableGoalsResult.rows.length === 0
        ? []
        : // in case of type return just go "const availableGoals: AvailableGoal[] = availableGoalsResult.rows;"
          availableGoalsResult.rows.map((row: AvailableGoal) => ({
            id: row.id,
            category: row.category,
            title: row.title,
            description: row.description,
          }));
    client.query("COMMIT");
    return { userGoal, availableGoals };
  } catch (error) {
    client.query("ROLLBACK");
    console.error("Error fetching user goals:", error);
    throw new Error("Failed to fetch user goals");
  } finally {
    client.release();
  }
};

export const updateGoal = async (
  userId: string,
  goalPost: GoalPost
): Promise<void> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  if (!goalPost || !goalPost.end_date || !goalPost.target_value) {
    throw new Error("Goal data is required");
  }

  console.log("Updating user goal:", goalPost);

  if (!goalPost.goal_id) {
    throw new Error("Goal ID is required");
  }

  // a constant to help with determining where and what data to get as the starting value
  // I think this is a bad design, but I will continue with this for now to fully understand why its bad and how to make it better.
  const goalIdToUserProfile: Record<number, string> = {
    1: "current_weight",
    2: "body_fat_percentage",
    3: "current_calories_target",
    4: "current_pushups",
    5: "current_walking_minutes",
  };

  const client = await pool.connect();

  //TODO: Add the start value from the user_profile

  try {
    client.query("BEGIN");
    await client.query("DELETE FROM user_goals WHERE user_id = $1", [userId]);

    const updateResult = await client.query(
      `
      INSERT INTO user_goals (user_id, goal_id, end_at, goal_target_value)
      VALUES ($1, $2, $3, $4)
     `,
      [userId, goalPost.goal_id, goalPost.end_date, goalPost.target_value]
    );

    // TODO: see if we need to update anything on other tables
    if (updateResult.rowCount === 0) {
      throw new Error("Failed to update user goal");
    }

    console.log("Added the following row ", updateResult.rows[0]);
    client.query("COMMIT");
  } catch (error) {
    client.query("ROLLBACK");
    console.error("Error updating user goal:", error);
    throw new Error("Failed to update user goal");
  } finally {
    client.release();
  }
};
