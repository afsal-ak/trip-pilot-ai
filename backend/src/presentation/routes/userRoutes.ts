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
import { ItineraryUseCase } from '../../application/usecases/ItineraryUseCase';
import { ItineraryController } from '../controllers/user/ItineraryController';
import { GeminiService } from '../../infrastructure/services/GeminiService';
import { openRouterClient } from '../../config/openRouter';
import { AiService } from '../../infrastructure/services/aiService';
import { ItineraryRepository } from '../../infrastructure/repositories/ItineraryRepository';

const userRepository = new UserRepository();
const userAuthUseCases = new UserAuthUsecases(
    userRepository,
);
const userAuthController = new UserAuthController(userAuthUseCases);

const geminiService = new GeminiService()

const aiService = new AiService(openRouterClient);

const itineraryRepository = new ItineraryRepository()
const itineraryUseCase = new ItineraryUseCase(aiService, itineraryRepository, geminiService);
const itineraryController = new ItineraryController(itineraryUseCase);


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
    itineraryController.uploadDocument
);

router.get(
    "/itineraries",
    userAuthMiddleware,
    itineraryController.getUserItineraries
);

router.get(
    "/itineraries/:id",
    userAuthMiddleware,
    itineraryController.getSingleItinerary

);

router.patch(
  '/itineraries/:id/public',
  userAuthMiddleware,
  itineraryController
    .togglePublicStatus
);

router.get(
  '/public/itinerary/:shareId',
  itineraryController
    .getSharedItinerary
);
export default router;
