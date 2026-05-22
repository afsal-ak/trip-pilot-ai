// import pdfParse from 'pdf-parse';
// import Tesseract from 'tesseract.js';

// import { IUploadUseCase } from '../useCaseInterfaces/IUploadUseCase';
// import { AppError } from '../../shared/utils/AppError';
// import { HttpStatus } from '../../constants/HttpStatus/HttpStatus';
// import { IGeminiService } from '../../infrastructure/services/IGeminiService';

// export class UploadUseCase implements IUploadUseCase {
//     constructor(private _geminiService: IGeminiService ) { }

//     async uploadAndExtract(file: Express.Multer.File): Promise<string> {
//         if (!file) {
//             throw new AppError(HttpStatus.NO_CONTENT, 'No file uploaded');
//         }

//         // PDF extraction
//         if (file.mimetype === 'application/pdf') {
//             const pdfData = await pdfParse(file.buffer);
//             return pdfData.text;
//         }

//         // Image OCR
//         if (file.mimetype.startsWith('image/')) {
//             const { data: { text } } = await Tesseract.recognize(file.buffer, 'eng');
//             return text;
//         }

//         throw new AppError(HttpStatus.BAD_REQUEST, 'Unsupported file type');
//     }
// }



import pdfParse from 'pdf-parse';
import Tesseract from 'tesseract.js';

import { AppError } from '../../shared/utils/AppError';
import { HttpStatus } from '../../constants/HttpStatus/HttpStatus';
import { IGeminiService } from '../../infrastructure/services/IGeminiService';
import { IAiService } from '../../infrastructure/services/IAiService';
import { IItineraryRepository } from '../../domain/repositories/IItineraryRepository';
import { IItinerary } from '../../domain/entities/IItinerary';
import { IItineraryUseCase } from '../useCaseInterfaces/IItineraryUseCase';
import { ItineraryMapper } from '../mapper/ItineraryMapper';
import { ItineraryDetailDto, ItineraryListDto } from '../dtos/itineraryDTO';
import { PaginationDto } from '../dtos/PaginatedItineraryDTO';

export class ItineraryUseCase implements IItineraryUseCase {
    constructor(
        private readonly _aiService: IAiService,
        private readonly _itineraryRepository: IItineraryRepository,
        private _geminiService: IGeminiService

    ) { }

    async GenerateItinerary(userId: string, file: Express.Multer.File): Promise<IItinerary> {
        if (!file) {
            throw new AppError(HttpStatus.NO_CONTENT, 'No file uploaded');
        }

        let extractedText = '';

        // PDF extraction
        if (file.mimetype === 'application/pdf') {
            const pdfData = await pdfParse(file.buffer);
            extractedText = pdfData.text;
        }

        // Image OCR
        else if (file.mimetype.startsWith('image/')) {
            const { data: { text } } = await Tesseract.recognize(file.buffer, 'eng');
            extractedText = text;
        }

        else {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Unsupported file type');
        }

        if (!extractedText.trim()) {
            throw new AppError(
                HttpStatus.BAD_REQUEST,
                'Could not extract readable text from document'
            );
        }

        const aiResponse = await this._geminiService.generateItinerary(extractedText);
        // const aiResponse = await this._aiService.generateItinerary(extractedText);
        console.log(aiResponse, 'aiResponse itenary');
        // Clean markdown if AI returns ```json
        const cleaned =
            aiResponse
                .replace(
                    /```json/g,
                    ""
                )
                .replace(
                    /```/g,
                    ""
                )
                .trim();

        let parsed;

        try {
            parsed =
                JSON.parse(
                    cleaned
                );
        } catch (error) {
            console.error(
                "Invalid AI JSON:",
                cleaned
            );

            throw new AppError(
                HttpStatus.BAD_REQUEST,
                "Failed to parse AI itinerary"
            );
        }

        // Normalize AI response
        parsed.days =
            parsed.days?.map(
                (
                    day: any,
                    index: number
                ) => ({
                    day:
                        day.day ??
                        index + 1,

                    date:
                        day.date,

                    title:
                        day.title ??
                        `Day ${index + 1}`,

                    activities:
                        day.activities?.map(
                            (
                                act: any
                            ) => ({
                                time:
                                    act.time ??
                                    "",

                                activity:
                                    act.activity ??
                                    act.description ??
                                    "",

                                location:
                                    act.location ??
                                    "",

                                type:
                                    (
                                        act.type ??
                                        "leisure"
                                    ).toLowerCase(),

                                notes:
                                    act.notes ??
                                    "",
                            })
                        ) ?? [],
                })
            );

        // Normalize travel details
        parsed.travelDetails =
            parsed.travelDetails ?? {
                flights: [],
                hotels: [],
            };

        parsed.travelDetails.flights =
            parsed.travelDetails
                .flights ?? [];

        parsed.travelDetails.hotels =
            parsed.travelDetails
                .hotels ?? [];

        parsed.tips =
            parsed.tips ?? [];
        // Save in MongoDB
        const savedItinerary =
            await this._itineraryRepository.create(
                {
                    userId,

                    itinerary: {
                        ...parsed,

                        extractedText,

                        uploadedDocuments:
                            [file.originalname],

                        shareId:
                            crypto.randomUUID(),

                        isPublic: false,
                    },
                }
            );

        return savedItinerary;
        // return itinerary!;
    }

    async getUserItineraries(
        userId: string,
        page: number,
        limit: number
    ): Promise<PaginationDto<ItineraryListDto>> {

        const result = await this._itineraryRepository.findByUserId(
            userId,
            page,
            limit
        );

        return {
            items: result.items.map((itinerary) =>
                ItineraryMapper.toListDto(
                    itinerary
                )
            ),

            pagination: {
                page: result.page,
                limit: result.limit,
                total: result.total,
                totalPages: result.totalPages,
            },
        };
    }

    async getSingleItinerary(
        itineraryId: string
    ): Promise<
        ItineraryDetailDto
    > {
        const itinerary =
            await this
                ._itineraryRepository
                .findById(
                    itineraryId
                );

        if (!itinerary) {
            throw new AppError(
                HttpStatus.NOT_FOUND,
                "Itinerary not found"
            );
        }

        return ItineraryMapper.toDetailDto(
            itinerary
        );
    }
}