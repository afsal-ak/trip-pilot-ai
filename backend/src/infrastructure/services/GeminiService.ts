import { GoogleGenerativeAI } from "@google/generative-ai";
import { IGeminiService } from "./IGeminiService";

const genAI =
  new GoogleGenerativeAI(
    process.env
      .GEMINI_API_KEY!
  );

export class GeminiService
  implements IGeminiService
{
  private sleep(
    ms: number
  ) {
    return new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          ms
        )
    );
  }

  async generateItinerary(
    extractedText: string
  ): Promise<string> {
    const models = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-2.5-flash-lite",
    ];

   const prompt = `
You are an AI travel itinerary generator.

Return ONLY valid JSON.

STRICT RULES:
- Maximum 4 days only.
- Follow schema EXACTLY.
- Never rename fields.
- Never skip required fields.
- Do NOT use "description".
- Always use "activity".
- Every day MUST contain:
  - day
  - date
  - title
  - activities
- Every activity MUST contain:
  - time
  - activity
  - location
  - type
  - notes

Allowed activity types ONLY:
- flight
- hotel
- sightseeing
- food
- transport
- leisure

Return EXACTLY this structure:

{
  "title": "",
  "destination": "",
  "startDate": "",
  "endDate": "",
  "summary": "",
  "days": [
    {
      "day": 1,
      "date": "",
      "title": "",
      "activities": [
        {
          "time": "",
          "activity": "",
          "location": "",
          "type": "flight",
          "notes": ""
        }
      ]
    }
  ],
  "travelDetails": {
    "flights": [
      {
        "from": "",
        "to": "",
        "departureTime": "",
        "arrivalTime": "",
        "flightNumber": ""
      }
    ],
    "hotels": [
      {
        "name": "",
        "checkIn": "",
        "checkOut": "",
        "location": ""
      }
    ]
  },
  "tips": []
}

Travel Information:
${extractedText}
`;

    for (const modelName of models) {
      try {
        console.log(
          `Trying ${modelName}`
        );

        const model =
          genAI.getGenerativeModel(
            {
              model:
                modelName,
            }
          );

        for (
          let attempt = 1;
          attempt <= 2;
          attempt++
        ) {
          try {
            console.time(
              "Gemini generation"
            );

            const result =
              await model.generateContent(
                prompt
              );

            console.timeEnd(
              "Gemini generation"
            );

            const text =
              result.response.text();

            if (!text)
              throw new Error(
                "Empty response"
              );

            return text.trim();
          } catch (err: any) {
            const is503 =
              err?.status ===
              503;

            if (
              is503 &&
              attempt < 2
            ) {
              console.log(
                "Retrying..."
              );

              await this.sleep(
                2000
              );

              continue;
            }

            throw err;
          }
        }
      } catch (err) {
        console.log(
          `Failed ${modelName}`
        );
      }
    }

    throw new Error(
      "All Gemini models unavailable"
    );
  }
}


// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { IGeminiService } from "./IGeminiService";

// const genAI =
//   new GoogleGenerativeAI(
//     process.env
//       .GEMINI_API_KEY!
//   );

// export class GeminiService
//   implements IGeminiService
// {
//   async generateItinerary(
//     extractedText: string
//   ): Promise<string> {
//     try {
//       console.time(
//         "Gemini itinerary generation"
//       );

//       const model =
//         genAI.getGenerativeModel(
//           {
//             model:
//               process.env
//                 .GEMINI_MODEL as string,
//           }
//         );

//       const prompt = `
// You are an expert AI travel planner.

// Generate a concise and structured travel itinerary from uploaded booking information.

// Rules:
// - Maximum 4 days only.
// - Use booking details as source of truth.
// - Keep activities concise.
// - Include hotel and flight information if available.
// - Include timings when available.
// - Avoid filler text.
// - Keep notes short (maximum 1 sentence).
// - Return ONLY valid JSON.
// - Do NOT wrap response in markdown or \`\`\`json.

// IMPORTANT:
// Allowed activity types ONLY:
// - flight
// - hotel
// - sightseeing
// - food
// - transport
// - leisure

// Never use any other values.

// Keep the response compact.

// Return ONLY in this JSON format:

// {
//   "title": "",
//   "destination": "",
//   "startDate": "",
//   "endDate": "",
//   "summary": "",

//   "days": [
//     {
//       "day": 1,
//       "date": "",
//       "title": "",
//       "activities": [
//         {
//           "time": "",
//           "activity": "",
//           "location": "",
//           "type": "flight",
//           "notes": ""
//         }
//       ]
//     }
//   ],

//   "travelDetails": {
//     "flights": [
//       {
//         "from": "",
//         "to": "",
//         "departureTime": "",
//         "arrivalTime": "",
//         "flightNumber": ""
//       }
//     ],

//     "hotels": [
//       {
//         "name": "",
//         "checkIn": "",
//         "checkOut": "",
//         "location": ""
//       }
//     ]
//   },

//   "tips": []
// }

// Travel Information:
// ${extractedText}
// `;

//       const result =
//         await model.generateContent(
//           prompt
//         );

//       console.timeEnd(
//         "Gemini itinerary generation"
//       );

//       const response =
//         result.response.text();

//       if (!response) {
//         throw new Error(
//           "No Gemini response received"
//         );
//       }

//       return response.trim();
//     } catch (error) {
//       console.error(
//         "Gemini itinerary generation error:",
//         error
//       );

//       throw new Error(
//         "Failed to generate itinerary"
//       );
//     }
//   }
// }











// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { IGeminiService } from './IGeminiService';

// const genAI = new GoogleGenerativeAI( process.env.GEMINI_API_KEY! );

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

//         const result = await model.generateContent( prompt );

//         return result.response.text();
//     }
// }

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