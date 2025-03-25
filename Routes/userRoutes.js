import { Router } from "express";

import { loginController, logoutController, signupController, userAuthController } from "../controllers/user.controller.js";
import { loggedAuth } from "../middlewares/loggedAuth.middleware.js";

const userRouter = Router();
userRouter.post('/signup', signupController);
userRouter.post('/login', loginController);
userRouter.get('/userauth', userAuthController);
userRouter.get('/logout', loggedAuth, logoutController);
export default userRouter;