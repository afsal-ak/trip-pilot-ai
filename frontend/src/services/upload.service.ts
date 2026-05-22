import api from '@/lib/axios/api';

export const uploadTravelDocument =
    async (file: File ): Promise<any> => {
        const formData = new FormData();

        formData.append('file', file);

        const response = await api.post('/user/upload', formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            }
        );

        return response.data;
    };