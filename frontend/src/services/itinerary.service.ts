import api from '@/lib/axios/api';
import type { GetItinerariesResponse, Itinerary } from '@/types/IItinerary';

 
export const getAllItineraries =
  async (
    page = 1,
    limit = 6
  ): Promise<GetItinerariesResponse> => {
    const response =
      await api.get(
        `/user/itineraries?page=${page}&limit=${limit}`
      );

    return response.data.data;
  };

export const getSingleItinerary =
  async (
    itineraryId: string
  ): Promise<Itinerary> => {
    const response =
      await api.get(
        `/user/itineraries/${itineraryId}`
      );

    return response.data.data;
  };