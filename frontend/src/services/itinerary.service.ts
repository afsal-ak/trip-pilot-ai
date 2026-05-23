import api from '@/lib/axios/api';
import type { GetItinerariesResponse, Itinerary } from '@/types/IItinerary';

export const uploadAndGenerateItinerary =
    async (file: File): Promise<any> => {
        const formData = new FormData();

        formData.append('file', file);

        const response = await api.post('/user/generate', formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            }
        );

        return response.data;
    };

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

export const togglePublicStatus = async (itineraryId: string) => {
    const response =
        await api.patch(
            `/user/itineraries/${itineraryId}/public`
        );

    return response.data.data;
}

export const getSharedItinerary = async (shareId: string) => {
    const response =
        await api.get(
            `/user/public/itinerary/${shareId}`
        );


    return response.data.data;
};