import { GoogleGenerativeAI } from '@google/generative-ai';
import { IGeminiService } from './IGeminiService';

const genAI = new GoogleGenerativeAI( process.env.GEMINI_API_KEY! );

export class GeminiService implements IGeminiService {
    async generateItinerary(extractedText: string): Promise<string> {
        const model = genAI.getGenerativeModel(
            { model: process.env.GEMINI_MODEL as string }
        );

        const prompt = `
            You are an expert travel planner.

            Using the booking information below,
            generate a professional travel itinerary.

            Booking Details:
            ${extractedText}

            Include:

            1. Trip Summary
            2. Flight Information
            3. Hotel Stay
            4. Day-wise itinerary
            5. Recommended activities
            6. Travel tips

            Keep it clean, structured,
            and user-friendly.
            `;

        const result = await model.generateContent( prompt );

        return result.response.text();
    }
}

// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { IGeminiService } from './IGeminiService';
// import { AppError } from '../../shared/utils/AppError';
// import { HttpStatus } from '../../constants/HttpStatus/HttpStatus';

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export class GeminiService implements IGeminiService {
//     async generateItinerary(extractedText: string): Promise<string> {
//         const model = genAI.getGenerativeModel(
//             { model: process.env.GEMINI_MODEL as string }
//         );

//         const prompt = `
//             You are an expert travel planner.

//             Using the booking information below,
//             generate a professional travel itinerary.

//             Booking Details:
//             ${extractedText}

//             Include:

//             1. Trip Summary
//             2. Flight Information
//             3. Hotel Stay
//             4. Day-wise itinerary
//             5. Recommended activities
//             6. Travel tips

//             Keep it clean, structured,
//             and user-friendly.
//             `;

//         // const result = await model.generateContent( prompt );
//         try {
//             const result =
//                 await model.generateContent(
//                     prompt
//                 );

//             return result.response.text();
//         } catch (error) {
//             throw new AppError(
//                 HttpStatus.BAD_REQUEST,
//                 'AI service temporarily busy. Please try again.'
//             );
//         }
//     }
// }