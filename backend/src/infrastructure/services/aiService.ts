import OpenAI from "openai";
import { IAiService } from "./IAiService";

export class AiService
  implements IAiService
{
  constructor(
    private readonly client: OpenAI
  ) {}

  async generateItinerary(
    extractedText: string
  ): Promise<string> {
    try {
      console.time(
        "AI itinerary generation"
      );

      const response =
        await this.client.chat.completions.create(
          {
            model:
              process.env.OPENROUTER_MODEL!,

            temperature: 0.3,

            max_tokens: 900,

            messages: [
              {
                role:
                  "system",

                content: `
You are an expert AI travel planner.

Generate a concise and structured travel itinerary from uploaded booking information.

Rules:
- Maximum 4 days only.
- Use booking details as source of truth.
- Keep activities concise.
- Include hotel and flight information if available.
- Include timings when available.
- Avoid filler text.
- Keep notes short (maximum 1 sentence).
- Return ONLY valid JSON.
- Do NOT wrap response in markdown.

IMPORTANT:
Allowed activity types ONLY:
- flight
- hotel
- sightseeing
- food
- transport
- leisure

Never use any other type values.

Keep the response compact.

Return format:

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
                `,
              },

              {
                role:
                  "user",

                content: `
Travel information:

${extractedText}

Generate itinerary now.
                `,
              },
            ],
          }
        );

      console.timeEnd(
        "AI itinerary generation"
      );

      const content =
        response.choices[0]
          ?.message
          ?.content;

      if (!content) {
        throw new Error(
          "No AI response received"
        );
      }

      return content.trim();
    } catch (error) {
      console.error(
        "AI itinerary generation error:",
        error
      );

      throw new Error(
        "Failed to generate itinerary"
      );
    }
  }
}
// import OpenAI from 'openai';
// import { IAiService } from './IAiService';

// export class AiService implements IAiService {
//     constructor(private readonly client: OpenAI) { }
//     async generateItinerary(extractedText: string): Promise<string> {
// //         const response =
// //             await this.client.chat.completions.create({
// //                 model:
// //                     process.env.OPENROUTER_MODEL!,
// //                 temperature: 0.4,
// //                 max_tokens: 1200,
// //                 messages: [
// //                     {
// //                         role: "system",
// //                         content: `
// // You are an expert AI travel planner.

// // Generate a concise and structured travel itinerary from uploaded booking information.

// // Rules:
// // - Maximum 4 days only.
// // - Keep activities concise.
// // - Use booking details as source of truth.
// // - Include hotel and flight information if available.
// // - Include timings when available.
// // - Avoid unnecessary filler text.
// // - Keep notes short (max 1 sentence).
// // - Do not create too many activities.
// // - Return ONLY valid JSON.
// // - Do NOT wrap in markdown or \`\`\`json.

// // Return format:

// // {
// //   "title": "",
// //   "destination": "",
// //   "startDate": "",
// //   "endDate": "",
// //   "summary": "",

// //   "days": [
// //     {
// //       "day": 1,
// //       "date": "",
// //       "title": "",
// //       "activities": [
// //         {
// //           "time": "",
// //           "activity": "",
// //           "location": "",
// //           "type": "flight | hotel | sightseeing | food | transport | leisure",
// //           "notes": ""
// //         }
// //       ]
// //     }
// //   ],

// //   "travelDetails": {
// //     "flights": [
// //       {
// //         "from": "",
// //         "to": "",
// //         "departureTime": "",
// //         "arrivalTime": "",
// //         "flightNumber": ""
// //       }
// //     ],

// //     "hotels": [
// //       {
// //         "name": "",
// //         "checkIn": "",
// //         "checkOut": "",
// //         "location": ""
// //       }
// //     ]
// //   },

// //   "tips": []
// // }

// // Travel information:
// // ${extractedText}
// // `
// //                     },
// //                 ],
// //             });
// const response =
//   await this.client.chat.completions.create({
//     model:
//       process.env.OPENROUTER_MODEL!,

//     temperature: 0.3,
//     max_tokens: 800,

//     messages: [
//       {
//         role: "system",
//         content: `
// You are a travel itinerary generator.

// Generate a concise itinerary.

// Rules:
// - Maximum 4 days.
// - Use booking details as source of truth.
// - Keep activities short.
// - Include flight and hotel details.
// - Return ONLY valid JSON.
// - No markdown.
//         `,
//       },
//       {
//         role: "user",
//         content: `
// Travel info:

// ${extractedText}

// Return format:

// {
// "title":"",
// "destination":"",
// "startDate":"",
// "endDate":"",
// "summary":"",
// "days":[
// {
// "day":1,
// "date":"",
// "title":"",
// "activities":[
// {
// "time":"",
// "activity":"",
// "location":"",
// "type":"",
// "notes":""
// }
// ]
// }
// ],
// "travelDetails":{
// "flights":[],
// "hotels":[]
// },
// "tips":[]
// }
//         `,
//       },
//     ],
//   });
//         return response.choices[0]
//             .message.content!;
//     }

//     // async generateItinerary(extractedText: string): Promise<string> {
//     //     const response = await this.client.chat.completions.create(
//     //         {
//     //             model: process.env.OPENROUTER_MODEL!,

//     //             messages: [
//     //                 {
//     //                     role: 'system',
//     //                     content:'You are an AI travel planner.',
//     //                 },
//     //                 {
//     //                     role: 'user',
//     //                     content: `
//     //                     Generate a structured travel itinerary based on this travel information:

//     //                     ${extractedText}

//     //                     Return only valid JSON in this format:

//     //                     {
//     //                     "title": "",
//     //                     "days": [
//     //                         {
//     //                         "day": 1,
//     //                         "title": "",
//     //                         "activities": []
//     //                         }
//     //                     ]
//     //                     }
//     //                                 `,
//     //                 },
//     //             ],
//     //         }
//     //     );

//     //     return response
//     //         .choices[0]
//     //         .message.content!;
//     // }
// }