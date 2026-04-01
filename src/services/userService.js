import apiClient from './apiClient';
import { API_ROUTES } from '../constants/apiRoutes';

export const userService = {
  getProfile: () => apiClient(API_ROUTES.USER_PROFILE),
};
