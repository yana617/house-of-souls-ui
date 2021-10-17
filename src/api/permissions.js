import axios from 'axios';

const { VUE_APP_AUTH_SERVICE: AUTH_SERVICE_API } = process.env;
const permissionsApi = `${AUTH_SERVICE_API}/permissions`;

export default {
  getMyPermissions: async () => axios.get(`${permissionsApi}/me`)
    .then((response) => {
      const { data: permissions } = response.data;
      return permissions;
    })
    .catch(() => []),
  getPermissions: async () => {
    const { data: { data: permissions } } = await axios.get(permissionsApi);
    return permissions;
  },
  updatePermissions: async ({ userId, permissions }) => {
    await axios.put(permissionsApi, { userId, permissions });
  },
};
