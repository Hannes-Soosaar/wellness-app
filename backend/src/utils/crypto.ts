import bcrypt from "bcrypt";
import { randomBytes, createCipheriv, createDecipheriv } from "crypto";
import dotenv from "dotenv";
dotenv.config();

const saltRounds: number = parseInt(process.env.SALT_ROUNDS || "10", 10);
const secretKey: Buffer = Buffer.from(process.env.SECRET_KEY, "hex") || "";
const algorithm: string = process.env.ENCRYPTION_METHOD || "aes-256-cbc";

console.log("Using encryption method:", algorithm);
console.log("Using secret key:", secretKey);
console.log("Using salt rounds:", saltRounds);

async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.error("Error hashing password:", error);
  }
  return "";
}
// The try catch might be unnecessary here, and might mess up the error handling
async function verifyPassword(
  inputPassword: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    console.error("Error verifying password:", error);
  }
  return false;
}

function encryptText(text: string): string {
  console.log("Using encryption method:", algorithm);
  console.log("Using secret key:", secretKey);
  console.log("Using salt rounds:", saltRounds);
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, secretKey, iv);
  let encryptedText = cipher.update(text, "utf-8", "hex");
  encryptedText += cipher.final("hex");
  return iv.toString("hex") + ":" + encryptedText;
}

function decryptText(encrypted: string): string {
  console.log("Using encryption method:", algorithm);
  console.log("Using secret key:", secretKey);
  console.log("Using salt rounds:", saltRounds);
  const [ivHex, encryptedText] = encrypted.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = createDecipheriv(algorithm, secretKey, iv);
  let decryptedText = decipher.update(encryptedText, "hex", "utf-8");
  decryptedText += decipher.final("utf-8");
  return decryptedText;
}

export { hashPassword, verifyPassword, encryptText, decryptText };
