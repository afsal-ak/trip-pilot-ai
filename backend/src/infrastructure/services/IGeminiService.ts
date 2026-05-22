export interface IGeminiService {
  generateItinerary(extractedText: string): Promise<string>;
}