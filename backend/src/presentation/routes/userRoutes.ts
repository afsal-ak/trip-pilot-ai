import { Router } from 'express';

import { userAuthMiddleware } from '../middlewares/userAuthMiddleware';
 import {
  AUTH_ROUTES,
   
   
 } from '../../constants/route-constants/userRoutes';

import { UserAuthUsecases } from '../../application/usecases/user/userAuthUseCases';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
 import { userRefreshToken } from '../../presentation/controllers/token/userRefreshToken';
 import { UserAuthController } from '../../presentation/controllers/user/UserAuthController';
 

const userRepository = new UserRepository();
 const userAuthUseCases = new UserAuthUsecases(
  userRepository,
 );
const userAuthController = new UserAuthController(userAuthUseCases);

 
 

const router = Router();

// AUTH ROUTES
router.post(AUTH_ROUTES.REFRESH_TOKEN, userRefreshToken);
 router.post(AUTH_ROUTES.REGISTER, userAuthController.register);
 router.post(AUTH_ROUTES.LOGIN, userAuthController.login);
 router.post(AUTH_ROUTES.LOGOUT, userAuthController.userLogout);
 
 
export default router;
