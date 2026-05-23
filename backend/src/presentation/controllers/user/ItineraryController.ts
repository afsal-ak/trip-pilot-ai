import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../../../constants/HttpStatus/HttpStatus';
import { IItineraryUseCase } from '../../../application/useCaseInterfaces/IItineraryUseCase';
import { getUserIdFromRequest } from '../../../shared/utils/getUserIdFromRequest';


export class ItineraryController {
    constructor(private _itineraryUseCase: IItineraryUseCase) { }

    uploadDocument = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = getUserIdFromRequest(req)
            const file = req.file;

            if (!file) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false, message: 'File is required'
                });

                return;
            }

            const extractedText = await this._itineraryUseCase.GenerateItinerary(userId, file);
            console.log(file.mimetype, 'mime');
            console.log(extractedText, 'extractedText');
            res.status(HttpStatus.OK)
                .json({
                    success: true,
                    message: 'Document extracted successfully',
                    extractedText,
                });
        } catch (error) {
            next(error);
        }
    };

    getUserItineraries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = getUserIdFromRequest(req)

            const page = Number(req.query.page) || 1;

            const limit = Number(req.query.limit) || 10;

            const itineraries = await this._itineraryUseCase.getUserItineraries(
                userId,
                page,
                limit
            );

            res.status(HttpStatus.OK).json({
                success: true,
                message: "Itineraries fetched successfully",
                data: itineraries,
            });
        } catch (error) {
            next(error)
        }

    }

    getSingleItinerary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

        } catch (error) {
            next(error)
        }
        const itineraryId = req.params.id;

        const itinerary = await this._itineraryUseCase.getSingleItinerary(itineraryId);

        res.status(HttpStatus.OK).json({
            success: true,
            message: "Itinerary fetched successfully",
            data: itinerary,
        });
    }

    togglePublicStatus =
        async (
            req: Request,
            res: Response,
            next: NextFunction
        ): Promise<void> => {
            try {
                const userId =
                    getUserIdFromRequest(
                        req
                    );

                const itineraryId =
                    req.params.id;

                const result =
                    await this
                        ._itineraryUseCase
                        .togglePublicStatus(
                            itineraryId,
                            userId
                        );

                res.status(
                    HttpStatus.OK
                ).json({
                    success: true,
                    message:
                        result.isPublic
                            ? 'Itinerary is now public'
                            : 'Itinerary is now private',

                    data:
                        result,
                });
            } catch (error) {
                next(error);
            }
        };

    getSharedItinerary =
        async (
            req: Request,
            res: Response,
            next: NextFunction
        ): Promise<void> => {
            try {
                const shareId =
                    req.params.shareId;

                const itinerary =
                    await this
                        ._itineraryUseCase
                        .getSharedItinerary(
                            shareId
                        );

                res.status(
                    HttpStatus.OK
                ).json({
                    success: true,
                    message:
                        'Shared itinerary fetched successfully',

                    data:
                        itinerary,
                });
            } catch (error) {
                next(error);
            }
        };
}