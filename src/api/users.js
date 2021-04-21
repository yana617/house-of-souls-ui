import axios from 'axios';

import { API_HOST } from '@/constants';
import mock from './mock';

export default {
  getUsers: async (params) => {
    // TO-DO: Remove with mocks
    const limit = parseInt(process.env.VUE_APP_LIMIT, 10);
    await axios.get('https://jsonplaceholder.typicode.com/todos/1', { params: { limit, ...params } });
    return mock.usersMock;
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
};
