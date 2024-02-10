import axios from 'axios';

import { PERMISSIONS_URL } from './constants';

export const permissionsApi = {
  getMyPermissions: async () => axios
    .get(`${PERMISSIONS_URL}/me`)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  getPermissions: async () => axios
    .get(PERMISSIONS_URL)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  updatePermissions: async ({ userId, permissions }) => axios
    .put(PERMISSIONS_URL, { userId, permissions })
    .catch((error) => error.response.data),
};
