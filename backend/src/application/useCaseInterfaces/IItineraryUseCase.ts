import { IItinerary } from "../../domain/entities/IItinerary";
import { ItineraryDetailDto, ItineraryListDto } from "../dtos/itineraryDTO";
import { PaginationDto } from "../dtos/PaginatedItineraryDTO";

export interface IItineraryUseCase {
  GenerateItinerary(
    userId: string,
    file: Express.Multer.File
  ): Promise<IItinerary>;

  getUserItineraries(
    userId: string,
    page: number,
    limit: number
  ): Promise<
    PaginationDto<ItineraryListDto>
  >;

  getSingleItinerary(
    itineraryId: string
  ): Promise<
    ItineraryDetailDto
  >;
}