import OpenAI from 'openai';
import { IAiService } from './IAiService';

export class AiService implements IAiService {
    constructor(private readonly client: OpenAI) { }

    async generateItinerary(extractedText: string): Promise<string> {
        const response = await this.client.chat.completions.create(
            {
                model: process.env.OPENROUTER_MODEL!,

                messages: [
                    {
                        role: 'system',
                        content:'You are an AI travel planner.',
                    },
                    {
                        role: 'user',
                        content: `
                        Generate a structured travel itinerary based on this travel information:

                        ${extractedText}

                        Return only valid JSON in this format:

                        {
                        "title": "",
                        "days": [
                            {
                            "day": 1,
                            "title": "",
                            "activities": []
                            }
                        ]
                        }
                                    `,
                    },
                ],
            }
        );

        return response
            .choices[0]
            .message.content!;
    }
}