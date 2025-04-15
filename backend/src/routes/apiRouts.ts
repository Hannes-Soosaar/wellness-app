// Routs that do not require authentication
// Includes login, and register

import { Router } from 'express'; 
import { handleLogin } from '../controllers/loginController';
import handleRegister from '../controllers/registrationController';

const apiRouter = Router();

apiRouter.post('/login', handleLogin); // Ensure loginController is a valid middleware
apiRouter.post('/register', handleRegister);

export default apiRouter