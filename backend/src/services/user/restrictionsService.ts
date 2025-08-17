import { pool } from "@backend/server";
import {
  UserRestriction,
  RestrictionPost,
  Restriction,
} from "@shared/types/api";

export const getUserRestrictions = async (
  userId: string
): Promise<UserRestriction[]> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const result = await pool.query(
      "SELECT category, restriction FROM user_restrictions ur JOIN restriction_types rt ON ur.type_id = rt.id  WHERE ur.user_id = $1",
      [userId]
    );

    // No results is a valid return for this query.

    return result.rows.map((row) => ({
      category: row.category,
      restriction: row.restriction,
    }));
  } catch (error) {
    throw new Error(`Failed to fetch user restrictions: ${error}`);
  }
};

export const getRestrictions = async (): Promise<Restriction[]> => {
  try {
    const result = await pool.query(
      "SELECT * FROM restriction_types WHERE status = 'active'"
    );

    if (result.rows.length === 0) {
      throw new Error("No active restrictions found");
    }

    return result.rows.map((row) => ({
      category: row.category,
      restriction: row.restriction,
    }));
  } catch (error) {
    throw new Error(`Failed to fetch restrictions: ${error}`);
  }
};

export const updateUserRestrictions = async (
  userId: string,
  restrictions: RestrictionPost
): Promise<void> => {
  console.log(`Updating restrictions for user: ${userId}`);
  console.log(`Input restrictions:`, restrictions.restrictions);

  if (!userId) {
    throw new Error("User ID is required");
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const deleteResult = await client.query(
      "DELETE FROM user_restrictions WHERE user_id = $1 RETURNING *",
      [userId]
    );

    console.log(
      `Deleted ${deleteResult.rowCount} existing restrictions:`,
      deleteResult.rows
    );

    for (const restriction of restrictions.restrictions) {
      console.log(
        `Inserting restriction: ${restriction.category} - ${restriction.restriction}`
      );

      try {
        await client.query(
          "INSERT INTO user_restrictions (user_id, type_id) SELECT $1, id FROM restriction_types WHERE category = $2 AND restriction = $3",
          [userId, restriction.category, restriction.restriction]
        );
        console.log(
          `Successfully inserted restriction ${restriction.category} - ${restriction.restriction}`
        );
      } catch (error) {
        console.log(
          " failed to insert " +
            restriction.category +
            " - " +
            restriction.restriction
        );
        throw new Error(`Failed to insert restriction: ${error}`);
      }
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw new Error(`Failed to update user restrictions: ${error}`);
  } finally {
    client.release();
  }
};
