import { Router } from 'express';
import { loginUser } from '../controllers/user.controller';
// import { registerUser } from '../controllers/user.controller';


const userRouter: Router = Router();

// userRouter.route('/registerUser').post(registerUser);
userRouter.route('/loginUser').post(loginUser);

export { userRouter };
