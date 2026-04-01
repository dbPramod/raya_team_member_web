import apiClient from './apiClient';
import { API_ROUTES } from '../constants/apiRoutes';

export const authService = {
  login: (credentials) => apiClient(API_ROUTES.LOGIN, { body: credentials }),
  register: (data) => apiClient(API_ROUTES.REGISTER, { body: data }),
};
