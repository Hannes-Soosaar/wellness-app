import { pool } from "@backend/server";

// Run when the user enables MFA
export const setMfaSecret = async (
  userId: string,
  secret: string
): Promise<void> => {
  if (!userId || !secret) {
    throw new Error("User ID and secret are required");
  }

  try {
    const result = await pool.query(
      "UPDATE users SET mfa_secret = $1, mfa_enabled = TRUE WHERE id = $2 AND mfa_secret IS NULL",
      [secret, userId]
    );
    if (result.rowCount === 0) {
      throw new Error("Failed to set MFA secret or secret already exists");
    }
  } catch (error) {
    console.error("Error setting MFA secret:", error);
    throw new Error("Failed to set MFA secret");
  }
};

export const getUserSecret = async (userId: string): Promise<string | null> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const result = await pool.query(
      "SELECT mfa_secret FROM users WHERE id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      throw new Error("No MFA secret found for this user");
    }
    return result.rows[0].mfa_secret;
  } catch (error) {
    console.error("Error fetching user MFA secret:", error);
    throw new Error("Failed to fetch user MFA secret");
  }
};
