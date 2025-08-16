import { pool } from "@backend/server";
import { decryptText } from "../utils/crypto";

// Run when the user enables MFA
export const setMfaSecret = async (
  userId: string,
  secretEncrypted: string
): Promise<void> => {
  if (!userId || !secretEncrypted) {
    throw new Error("User ID and secret are required");
  }

  try {
    const result = await pool.query(
      "UPDATE users SET mfa_secret = $1 WHERE id = $2 AND mfa_secret IS NULL",
      [secretEncrypted, userId]
    );
    if (result.rowCount === 0) {
      console.log(
        "No rows updated, possibly MFA already enabled or secret already set"
      );
    }
  } catch (error) {
    console.error("Error setting MFA secret:", error);
    throw new Error("Failed to set MFA secret");
  }
};

export const getDecryptedUserSecret = async (
  userId: string
): Promise<string | null> => {
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

    return decryptText(result.rows[0].mfa_secret);
  } catch (error) {
    console.error("Error fetching user MFA secret:", error);
    throw new Error("Failed to fetch user MFA secret");
  }
};

export const enableMfa = async (userId: string): Promise<void> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const result = await pool.query(
      "UPDATE users SET mfa_enabled = TRUE WHERE id = $1",
      [userId]
    );
    if (result.rowCount === 0) {
      throw new Error("Failed to enable MFA or MFA already enabled");
    }
  } catch (error) {
    console.error("Error enabling MFA:", error);
    throw new Error("Failed to enable MFA");
  }
};

export const disableMfa = async (userId: string): Promise<void> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const result = await pool.query(
      "UPDATE users SET mfa_enabled = FALSE, mfa_secret = NULL WHERE id = $1",
      [userId]
    );
    if (result.rowCount === 0) {
      throw new Error("Failed to disable MFA or MFA already disabled");
    }
  } catch (error) {
    console.error("Error disabling MFA:", error);
    throw new Error("Failed to disable MFA");
  }
};
