import { Router } from 'express';

import { userAuthMiddleware } from '../middlewares/userAuthMiddleware';
import {
    AUTH_ROUTES,
    ITINERARY_ROUTES,
} from '../../constants/route-constants/userRoutes';

import { UserAuthUsecases } from '../../application/usecases/userAuthUseCases';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { userRefreshToken } from '../../presentation/controllers/token/userRefreshToken';
import { UserAuthController } from '../../presentation/controllers/user/UserAuthController';
import { upload } from '../middlewares/multer';
import { ItineraryUseCase } from '../../application/usecases/ItineraryUseCase';
import { ItineraryController } from '../controllers/user/ItineraryController';
import { GeminiService } from '../../infrastructure/services/GeminiService';
import { ItineraryRepository } from '../../infrastructure/repositories/ItineraryRepository';

const userRepository = new UserRepository();
const userAuthUseCases = new UserAuthUsecases(
    userRepository,
);
const userAuthController = new UserAuthController(userAuthUseCases);

const geminiService = new GeminiService()


const itineraryRepository = new ItineraryRepository()
const itineraryUseCase = new ItineraryUseCase(itineraryRepository, geminiService);
const itineraryController = new ItineraryController(itineraryUseCase);


const router = Router();

// AUTH ROUTES
router.post(AUTH_ROUTES.REFRESH_TOKEN, userRefreshToken);
router.post(AUTH_ROUTES.REGISTER, userAuthController.register);
router.post(AUTH_ROUTES.LOGIN, userAuthController.login);
router.post(AUTH_ROUTES.LOGOUT, userAuthController.userLogout);


// ITINERARY ROUTES

router.post(
    ITINERARY_ROUTES.GENERATE,
    userAuthMiddleware,
    upload.single('file'),
    itineraryController.generateItineraries
);

router.get(
    ITINERARY_ROUTES.GET_USER_ITINERARIES,
    userAuthMiddleware,
    itineraryController.getUserItineraries
);

router.get(
    ITINERARY_ROUTES.GET_SINGLE_ITINERARY,
    userAuthMiddleware,
    itineraryController.getSingleItinerary

);

router.patch(
    ITINERARY_ROUTES.TOGGLE_PUBLIC_STATUS,
    userAuthMiddleware,
    itineraryController
        .togglePublicStatus
);

router.get(
    ITINERARY_ROUTES.GET_SHARED_ITINERARY,
    itineraryController
        .getSharedItinerary
);
export default router;
