import axios from 'axios';

const { VUE_APP_AUTH_SERVICE: AUTH_SERVICE_API } = process.env;

export default {
  getMyPermissions: async () => axios.get(`${AUTH_SERVICE_API}/permissions/me`)
    .then((response) => {
      const { data: permissions } = response.data;
      return permissions;
    })
    .catch(() => []),
  getPermissions: async () => {
    const { data: { data: permissions } } = await axios.get(`${AUTH_SERVICE_API}/permissions`);
    return permissions;
  },
  updatePermissions: async ({ userId, permissions }) => {
    await axios.put(`${AUTH_SERVICE_API}/permissions`, { userId, permissions });
  },
};
