import axios from 'axios';

import { API_HOST } from '@/constants';

const { VUE_APP_AUTH_SERVICE: AUTH_SERVICE_API } = process.env;

export default {
  getMyPermissions: async () => axios.get(`${AUTH_SERVICE_API}/permissions/me`)
    .then((response) => {
      const { data: permissions } = response.data;
      return permissions;
    })
    .catch(() => []),
  getPermissions: async () => {
    const { data: { permissions } } = await axios.get(`${API_HOST}/permissions`);
    return permissions;
  },
  updatePermissions: async ({ userId, permissions }) => {
    await axios.put(`${API_HOST}/permissions`, { userId, permissions });
  },
};
