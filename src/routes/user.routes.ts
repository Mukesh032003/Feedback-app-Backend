import { Router } from 'express';
import { loginUser, logoutUser, updatePassword } from '../controllers/user.controller';
import verifyJwt from '../middlewares/auth';
// import { registerUser } from '../controllers/user.controller';


const userRouter: Router = Router();

// userRouter.route('/registerUser').post(registerUser);
userRouter.route('/loginUser').post(loginUser);
userRouter.route('/logoutUser').post(verifyJwt, logoutUser);
userRouter.route('/updatePassword').post(verifyJwt, updatePassword);

export { userRouter };
