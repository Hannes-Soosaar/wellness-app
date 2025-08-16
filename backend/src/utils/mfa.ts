import { authenticator } from "otplib";
import { encryptText } from "./crypto";
import { getDecryptedUserSecret } from "../services/mfaService";

export const generateEncryptedMfaSecret = (): string => {
  const secret = authenticator.generateSecret();
  const encryptedSecret = encryptText(secret);
  return encryptedSecret;
};

export const verifyMfaToken = (token: string, secret: string): boolean => {
  try {
    return authenticator.verify({ token, secret });
  } catch (error) {
    console.error("Error verifying MFA token:", error);
    return false;
  }
};

export const generateMfaUri = async (userId: string): Promise<string> => {
  try {
    const secret = await getDecryptedUserSecret(userId);

    if (!secret) {
      throw new Error("MFA secret not found for user");
    }
    return authenticator.keyuri(userId, "WellnessApp", secret);
  } catch (error) {
    console.error("Error generating MFA URI:", error);
    throw new Error("Failed to generate MFA URI");
  }
};
