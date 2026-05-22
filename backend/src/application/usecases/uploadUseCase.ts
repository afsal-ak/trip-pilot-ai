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

import { IUploadUseCase } from '../useCaseInterfaces/IUploadUseCase';
import { AppError } from '../../shared/utils/AppError';
import { HttpStatus } from '../../constants/HttpStatus/HttpStatus';
import { IGeminiService } from '../../infrastructure/services/IGeminiService';
import { IAiService } from '../../infrastructure/services/IAiService';

export class UploadUseCase implements IUploadUseCase {
    constructor(
        private readonly _aiService: IAiService,
        private _geminiService: IGeminiService

    ) { }

    async uploadAndExtract(file: Express.Multer.File): Promise<string> {
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

        // const itinerary = await this._geminiService.generateItinerary(extractedText);
         const itinerary =await this._aiService.generateItinerary(extractedText);
        console.log(itinerary, 'itenary');

        return itinerary!;
    }
}