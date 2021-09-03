import axios from 'axios';

import { API_HOST } from '@/constants';

export default {
  getPermissions: async () => {
    const { data: { permissions } } = await axios.get(`${API_HOST}/permissions`);
    return permissions;
  },
  updatePermissions: async ({ userId, permissions }) => {
    await axios.put(`${API_HOST}/permissions`, { userId, permissions });
  },
};
