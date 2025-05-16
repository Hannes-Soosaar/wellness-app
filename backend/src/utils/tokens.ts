import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const SECRET_KEY: jwt.Secret = process.env.SECRET_KEY || "";
const SECRET_KEY_REFRESH: jwt.Secret = process.env.SECRET_KEY_REFRESH || "";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1m";
const JWT_EXPIRATION_REFRESH = process.env.JWT_EXPIRATION_REFRESH || "15m";

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in environment variables");
}

function generateJWT(userId: string): string {
  const accessToken = jwt.sign({ id: userId }, SECRET_KEY, {
    expiresIn: JWT_EXPIRATION,
  });
  return accessToken;
}

function verifyJWT(token: string): string | jwt.JwtPayload {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error("Error verifying JWT:", error);
    throw new Error("Invalid token");
  }
}
function verifyJWTRefresh(token: string): string | jwt.JwtPayload {
  try {
    return jwt.verify(token, SECRET_KEY_REFRESH);
  } catch (error) {
    console.error("Error verifying JWT:", error);
    throw new Error("Invalid token");
  }
}

function generateRefreshToken(userId: string): string {
  const refreshToken = jwt.sign({ id: userId }, SECRET_KEY_REFRESH);
  return refreshToken;
}

export { generateJWT, verifyJWT, generateRefreshToken };
