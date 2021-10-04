import axios from 'axios';

const { VUE_APP_AUTH_SERVICE: AUTH_SERVICE_API } = process.env;

export default {
  getUsers: async (params) => {
    const limit = parseInt(process.env.VUE_APP_LIMIT, 10);
    const { data: { data: users } } = await axios.get(`${AUTH_SERVICE_API}/users`, { params: { limit, ...params } });
    return users;
  },
  updateUser: async (body) => axios.put(`${AUTH_SERVICE_API}/users/${body.id}`, body)
    .then((response) => response.data)
    .catch((error) => error.response.data),
  getUserPermissions: async (userId) => {
    const { data: { data: permissions } } = await axios.get(`${AUTH_SERVICE_API}/users/${userId}/permissions`);
    return permissions;
  },
  updateRole: async ({ userId, role }) => {
    await axios.put(`${AUTH_SERVICE_API}/users/${userId}/role`, { role });
  },
  getUserProfile: async ({ userId }) => {
    const { data: { data: user } } = await axios.get(`${AUTH_SERVICE_API}/users/${userId}`);
    return user;
  },
  getUser: async () => {
    const { data: { data: user } } = await axios.get(`${AUTH_SERVICE_API}/users/me`);
    return user;
  },
};
