import { pool } from "@backend/server";
import { MealOptions, UserMeal } from "@shared/types/api";

export const getActiveMealOptions = async (): Promise<MealOptions> => {
  const mealOptions: MealOptions = {
    mealTypes: [],
  };

  try {
    const result = await pool.query(
      "SELECT meal_type FROM meals where status = 'active'"
    );
    mealOptions.mealTypes = result.rows.map((row) => row.meal_type);

    if (mealOptions.mealTypes.length === 0) {
      throw new Error("No active meal options found");
    }
    return mealOptions;
  } catch (error) {
    console.error("Error fetching meal options", error);
    throw new Error("Failed to fetch meal options");
  }
};

export const updateUserMeals = async (
  userId: string,
  mealPost: UserMeal
): Promise<void> => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  if (!mealPost) {
    throw new Error("Meal data is required");
  }

  try {
    const updateResult = await pool.query(
      `
      INSERT INTO user_meals (user_id, meal_id, calories, consumed_at) SELECT
        $1, id, $3, $4 FROM meals WHERE meal_type = $2 RETURNING *
     `,
      [userId, mealPost.mealType, mealPost.calories, mealPost.consumedAt]
    );

    if (updateResult.rowCount === 0) {
      throw new Error(`Meal type "${mealPost.mealType}" not found`);
    }
  } catch (error) {
    throw new Error(`Failed to update user meals: ${error}`);
  }
};
