import axios from 'axios';

import { setToken } from '@/utils/sessionStorage';

import { AUTH_URL } from './constants';

const setNewToken = (response) => {
  const res = response.data;

  if (res?.accessToken) {
    setToken(res.accessToken);
  }
};

export const authApi = {
  login: async (body) =>
    axios
      .post(`${AUTH_URL}/login`, body)
      .then((response) => {
        setNewToken(response.data);
        return response.data;
      })
      .catch((error) => error.response.data),

  register: async (body) =>
    axios
      .post(`${AUTH_URL}/register`, body)
      .then((response) => {
        setNewToken(response.data);
        return response.data;
      })
      .catch((error) => error.response.data),

  forgotPassword: async ({ userId }) =>
    axios
      .post(`${AUTH_URL}/forgot-password`, { userId })
      .then((response) => response.data)
      .catch((error) => error.response.data),

  resetPassword: async (body) =>
    axios
      .post(`${AUTH_URL}/reset-password`, body)
      .then((response) => response.data)
      .catch((error) => error.response.data),

  logout: async () => axios.post(`${AUTH_URL}/logout`),
};
