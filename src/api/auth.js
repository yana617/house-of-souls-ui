import axios from 'axios';

import { setToken } from '@/utils/sessionStorage';

const { VUE_APP_AUTH_SERVICE: AUTH_SERVICE_API } = process.env;
const authApi = `${AUTH_SERVICE_API}/auth`;

const setNewToken = (response) => {
  const user = response.data;
  if (user && user.token) {
    setToken(user.token);
  }
};

export default {
  login: async (body) => axios.post(`${authApi}/login`, body)
    .then((response) => {
      setNewToken(response.data);
      return response.data;
    }),
  register: async (body) => axios.post(`${authApi}/register`, body)
    .then((response) => {
      setNewToken(response.data);
      return response.data;
    })
    .catch((error) => error.response.data),
  forgotPassword: async ({ email }) => axios.post(`${authApi}/forgot-password`, { email })
    .catch((error) => error.response.data),
  resetPassword: async (body) => axios.post(`${authApi}/reset-password`, body)
    .catch((error) => error.response.data),
};
