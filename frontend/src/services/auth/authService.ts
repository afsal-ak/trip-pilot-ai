import api from '@/lib/axios/api';

export const handleRegister = async (data: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
 }): Promise<string> => {
  const response = await api.post(`/user/register`, data);
  return response.data;
};

export const handleLogin = async (email: string, password: string) => {
  const response = await api.post('/user/login', { email, password });
  console.log(response, 'from service');
  return response.data;
};

export const handleLogout = async (): Promise<void> => {
  try {
    await api.post('/user/logout', {}, { withCredentials: true });
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Logout failed');
  }
};

export const refreshToken = async () => {
  const response = await api.get('/user/refreshToken');
  return response.data;
};
