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
  restorePassword: async ({ email }) => {
    const { data } = await axios.post(`${API_HOST}/restore-password`, { email });
    return data;
  },
};
