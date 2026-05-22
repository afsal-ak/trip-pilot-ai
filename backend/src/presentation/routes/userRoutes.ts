import { Router } from 'express';

import { userAuthMiddleware } from '../middlewares/userAuthMiddleware';
import {
    AUTH_ROUTES,
} from '../../constants/route-constants/userRoutes';

import { UserAuthUsecases } from '../../application/usecases/userAuthUseCases';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { userRefreshToken } from '../../presentation/controllers/token/userRefreshToken';
import { UserAuthController } from '../../presentation/controllers/user/UserAuthController';
import { upload } from '../middlewares/multer';
import { UploadUseCase } from '../../application/usecases/uploadUseCase';
import { UploadController } from '../controllers/user/UploadController';


const userRepository = new UserRepository();
const userAuthUseCases = new UserAuthUsecases(
    userRepository,
);
const userAuthController = new UserAuthController(userAuthUseCases);

const uploadUseCase = new UploadUseCase();
const uploadController = new UploadController(uploadUseCase);


const router = Router();

// AUTH ROUTES
router.post(AUTH_ROUTES.REFRESH_TOKEN, userRefreshToken);
router.post(AUTH_ROUTES.REGISTER, userAuthController.register);
router.post(AUTH_ROUTES.LOGIN, userAuthController.login);
router.post(AUTH_ROUTES.LOGOUT, userAuthController.userLogout);


router.post(
    '/upload',
    userAuthMiddleware,
    upload.single('file'),
    uploadController.uploadDocument
);
export default router;
