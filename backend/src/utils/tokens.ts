import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY =process.env.SECRET_KEY || ""
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in environment variables');
}

function generateJWT(userId: string, email: string): string {
  const token = jwt.sign({ id: userId, email }, SECRET_KEY, {
    expiresIn:'1h',
  });
  return token;
}

function verifyJWT(token: string): string | jwt.JwtPayload {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error('Error verifying JWT:', error);
    throw new Error('Invalid token');
  }
}

export { generateJWT, verifyJWT };