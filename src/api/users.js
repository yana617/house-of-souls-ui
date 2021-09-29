import axios from 'axios';

import { API_HOST } from '@/constants';
import { setToken } from '@/utils/sessionStorage';

const { VUE_APP_AUTH_SERVICE: AUTH_SERVICE_API } = process.env;

const setNewToken = (response) => {
  const user = response.data;
  if (user && user.token) {
    setToken(user.token);
  }
};

export default {
  login: async (body) => axios.post(`${AUTH_SERVICE_API}/auth/login`, body)
    .then((response) => {
      setNewToken(response.data);
      return response.data;
    }),
  register: async (body) => axios.post(`${AUTH_SERVICE_API}/auth/register`, body)
    .then((response) => {
      setNewToken(response.data);
      return response.data;
    })
    .catch((error) => error.response.data),
  forgotPassword: async ({ email }) => axios.post(`${AUTH_SERVICE_API}/auth/forgot-password`, { email })
    .catch((error) => error.response.data),
  resetPassword: async (body) => axios.post(`${AUTH_SERVICE_API}/auth/reset-password`, body)
    .catch((error) => error.response.data),
  getUsers: async (params) => {
    const limit = parseInt(process.env.VUE_APP_LIMIT, 10);
    const { data: { data } } = await axios.get(`${API_HOST}/users`, { params: { limit, ...params } });
    return data;
  },
  updateUser: async (body) => {
    const { data: { user } } = await axios.patch(`${API_HOST}/users/${body._id}`, body);
    return user;
  },
  getUserPermissions: async () => {
    const { data: { permissions } } = await axios.get(`${API_HOST}/users/permissions`);
    return permissions;
  },
  updateRole: async ({ userId, role }) => {
    await axios.put(`${API_HOST}/users/${userId}/role`, { role });
  },
  getUserProfile: async ({ userId }) => {
    const { data: { user } } = await axios.get(`${API_HOST}/users/${userId}`);
    return user;
  },
  getUser: async () => {
    const { data } = await axios.get(`${AUTH_SERVICE_API}/users/me`);
    return data;
  },
};
