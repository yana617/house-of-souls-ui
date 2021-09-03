import axios from 'axios';

import { API_HOST } from '@/constants';

export default {
  getUsers: async (params) => {
    const limit = parseInt(process.env.VUE_APP_LIMIT, 10);
    const { data: { data } } = await axios.get(`${API_HOST}/users`, { params: { limit, ...params } });
    return data;
  },
  login: async (body) => {
    const { data: { user } } = await axios.post(`${API_HOST}/login`, { user: body });
    return user;
  },
  logout: async () => {
    await axios.delete(`${API_HOST}/logout`);
    return true;
  },
  register: async (body) => {
    const { data: { user } } = await axios.post(`${API_HOST}/register`, { user: body });
    return user;
  },
  updateUser: async (body) => {
    const { data: { user } } = await axios.patch(`${API_HOST}/users/${body._id}`, body);
    return user;
  },
  forgotPassword: async ({ email }) => {
    const { data } = await axios.post(`${API_HOST}/forgot-password`, { email });
    return data;
  },
  resetPassword: async (body) => {
    const { data } = await axios.post(`${API_HOST}/reset-password`, body);
    return data;
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
};
