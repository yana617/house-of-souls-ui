import axios from 'axios';

import { setToken } from '@/utils/sessionStorage';

import { AUTH_URL } from './constants';

const setNewToken = (response) => {
  const user = response.data;
  if (user && user.token) {
    setToken(user.token);
  }
};

export const authApi = {
  login: async (body) => axios
    .post(`${AUTH_URL}/login`, body)
    .then((response) => {
      setNewToken(response.data);
      return response.data;
    })
    .catch((error) => error.response.data),

  register: async (body) => axios
    .post(`${AUTH_URL}/register`, body)
    .then((response) => {
      setNewToken(response.data);
      return response.data;
    })
    .catch((error) => error.response.data),

  forgotPassword: async ({ userId }) => axios
    .post(`${AUTH_URL}/forgot-password`, { userId })
    .then((response) => response.data)
    .catch((error) => error.response.data),

  resetPassword: async (body) => axios
    .post(`${AUTH_URL}/reset-password`, body)
    .then((response) => response.data)
    .catch((error) => error.response.data),
};
