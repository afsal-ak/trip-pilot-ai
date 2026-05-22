import { IItinerary } from "../entities/IItinerary";

export interface PaginationResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface ICreateItinerary {
  userId: string;
  itinerary: Partial<IItinerary>;
}

export interface IItineraryRepository {
  create(
    data: ICreateItinerary
  ): Promise<IItinerary>;

  findByUserId(
    userId: string,
    page: number,
    limit: number
  ): Promise<
    PaginationResult<IItinerary>
  >;

  findById(
    itineraryId: string
  ): Promise<IItinerary | null>;
}