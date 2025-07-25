import jwt, { Jwt } from "jsonwebtoken";
import dotenv from "dotenv";
import { pool } from "../../server";
import crypto from "crypto";
dotenv.config({ path: "../.env" });

const SECRET_KEY: jwt.Secret = process.env.SECRET_KEY;
const SECRET_KEY_REFRESH: jwt.Secret = process.env.SECRET_KEY_REFRESH;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
const JWT_EXPIRATION_REFRESH = process.env.JWT_EXPIRATION_REFRESH;
const JWT_EXPIRATION_PASSWORD = process.env.JWT_EXPIRATION_PASSWORD;
console.log("Keys Secret Key ", SECRET_KEY);
console.log("Keys Secret Refresh ", SECRET_KEY);

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in environment variables");
}
if (!SECRET_KEY_REFRESH) {
  throw new Error("SECRET_KEY_REFRESH is not defined in environment variables");
}
if (!SECRET_KEY_REFRESH) {
  throw new Error("SECRET_KEY_REFRESH is not defined in environment variables");
}

interface JwtPayload {
  id: string; // email
  iat: number; // issued at
  exp: number; // expiry
}

function generateJWT(userId: string): string {
  console.log("generating access token for user", userId);
  const accessToken = jwt.sign({ id: userId }, SECRET_KEY, {
    expiresIn: JWT_EXPIRATION as any, // cheating here a bit as what types sign needs is not very clear.
  });
  return accessToken;
}

function verifyJWT(token: string): JwtPayload {
  token = token.replace(/^"|"$/g, "");
  console.log("Access Token to be verified", token);
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    if (!decoded.id) {
      throw new Error("Token payload missing 'id'");
    }

    return decoded;
  } catch (error) {
    console.error("Error verifying Access JWT:", error);
    throw new Error("Invalid token");
  }
}
function generatePasswordResetJWT(): string {
  console.log("generating password reset token for email:");
  const resetToken = jwt.sign({ id: ">9000" }, SECRET_KEY, {
    expiresIn: JWT_EXPIRATION_PASSWORD as any, // cheating here a bit as what types sign needs is not very clear.
  });
  return resetToken;
}

function verifyPasswordResetJWT(token: string): JwtPayload {
  token = token.replace(/^"|"$/g, "");
  console.log("Password Reset Token to be verified", token);
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    if (!decoded.id) {
      throw new Error("Token payload missing 'id'");
    }

    return decoded;
  } catch (error) {
    console.error("Error verifying Reset JWT:", error);
    throw new Error("Invalid token");
  }
}

function verifyJWTRefresh(token: string): JwtPayload {
  token = token.replace(/^"|"$/g, "");
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    if (!decoded.id) {
      throw new Error("Token payload missing 'id'");
    }

    return decoded;
  } catch (error) {
    console.error("Error verifying Refresh JWT:", error);
    throw new Error("Invalid token");
  }
}

function generateRefreshToken(userId: string): string {
  const refreshToken = jwt.sign({ id: userId }, SECRET_KEY, {
    expiresIn: JWT_EXPIRATION_REFRESH as any,
  });
  return refreshToken;
}

const decodeJWT = (token: string) => {
  const payload = jwt.decode(token, { complete: true });
  console.log("Decoded (no verify):", payload);
};

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

interface TokenData {
  id: string;
  isExpired: boolean;
}

function decodeAndCheckToken(token: string): TokenData {
  const decoded = jwt.decode(token) as { [key: string]: any } | null;
  if (!decoded) {
    throw new Error("Invalid token: unable to decode");
  }

  const id = decoded.id;
  const issuedAt = decoded.iat;
  const expiresAt = decoded.exp;

  if (
    typeof id !== "string" ||
    typeof issuedAt !== "number" ||
    typeof expiresAt !== "number"
  ) {
    throw new Error("Invalid token payload structure");
  }

  const now = Math.floor(Date.now() / 1000);

  const isExpired = now >= expiresAt;

  return {
    id,
    isExpired,
  };
}

export {
  generateJWT,
  verifyJWT,
  generateRefreshToken,
  verifyJWTRefresh,
  decodeJWT,
  hashToken, //DEBUG
  decodeAndCheckToken, // DEBUG
  generatePasswordResetJWT,
  verifyPasswordResetJWT,
};
