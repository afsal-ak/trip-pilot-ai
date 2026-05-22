import { IItinerary } from "../../domain/entities/IItinerary";
import { ItineraryDetailDto, ItineraryListDto } from "../dtos/itineraryDTO";

 
export class ItineraryMapper {
  static toListDto(
    itinerary: IItinerary
  ): ItineraryListDto {
    return {
      id:itinerary._id!.toString(),

      title:
        itinerary.title,

      destination:
        itinerary.destination,

      startDate:
        itinerary.startDate,

      endDate:
        itinerary.endDate,

      summary:
        itinerary.summary,

      totalDays:
        itinerary.days
          ?.length ?? 0,

      status:
        itinerary.status,

      createdAt:
        itinerary.createdAt!,
    };
  }

  static toDetailDto(
    itinerary: IItinerary
  ): ItineraryDetailDto {
    return {
      id:itinerary._id!.toString(),

      title:
        itinerary.title,

      destination:
        itinerary.destination,

      startDate:
        itinerary.startDate,

      endDate:
        itinerary.endDate,

      summary:
        itinerary.summary,

      status:
        itinerary.status,

      days:
        itinerary.days,

      travelDetails:
        itinerary
          .travelDetails,

      tips:
        itinerary.tips ??
        [],

      uploadedDocuments:
        itinerary.uploadedDocuments ??
        [],

      shareId:
        itinerary.shareId,

      isPublic:
        itinerary.isPublic,

      createdAt:
        itinerary.createdAt!,
    };
  }
}