import axios from 'axios';

const { VUE_APP_AUTH_SERVICE: AUTH_SERVICE_API } = process.env;
const permissionsApi = `${AUTH_SERVICE_API}/permissions`;

export default {
  getMyPermissions: async () => axios
    .get(`${permissionsApi}/me`)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  getPermissions: async () => axios
    .get(permissionsApi)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  updatePermissions: async ({ userId, permissions }) => axios
    .put(permissionsApi, { userId, permissions })
    .catch((error) => error.response.data),
};
