import { Router } from 'express';
import handleUser from '../controllers/userController'



const userRouter = Router();

userRouter.get('/user', handleUser);

export default userRouter;