export interface IAiService {
  generateItinerary(extractedText: string): Promise<string>;
}