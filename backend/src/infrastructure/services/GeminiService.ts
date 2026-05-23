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

