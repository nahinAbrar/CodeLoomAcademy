import express from 'express';
import { registrationUser,activateUser, loginUser, logoutUser } from '../controllers/userController';
import { isAutheticated } from '../middleware/auth';
const userRouter = express.Router();

userRouter.post('/registration', registrationUser);

userRouter.post('/activate-user', activateUser);

userRouter.post('/login', loginUser);

userRouter.get('/logout',isAutheticated, logoutUser);

export default userRouter;