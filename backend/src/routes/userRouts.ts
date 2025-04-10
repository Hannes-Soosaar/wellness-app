import { Router } from 'express';
import { pool } from '../../server';
import  jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const userRouter = Router();

// router.post('/login', async (req, res) => {
//   console.log('Login request received:', req.body);
//   const { email, password } = req.body;
//   try {
//     const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//     if (result.rows.length > 0) {
//       const user = result.rows[0];
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (isPasswordValid) {
//         if (!process.env.SECRET_KEY) {
//           throw new Error('SECRET_KEY is not defined in environment variables');
//         }
//         const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, {
//           expiresIn: '1h',
//         });
//         res.json({ message: 'Login successful', token });
//       } else {
//         res.status(401).json({ message: 'Invalid password' });
//       }
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
 
export default userRouter;