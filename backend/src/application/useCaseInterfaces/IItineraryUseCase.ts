import { IItinerary } from "../../domain/entities/IItinerary";
import { ItineraryDetailDto, ItineraryListDto } from "../dtos/ItineraryDTO";
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

  togglePublicStatus(
  itineraryId: string,
  userId: string
): Promise<{
  isPublic: boolean;
}>;

getSharedItinerary(
  shareId: string
): Promise<ItineraryDetailDto>;
}