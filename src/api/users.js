import axios from 'axios';

const { VUE_APP_AUTH_SERVICE: AUTH_SERVICE_API } = process.env;
const usersApi = `${AUTH_SERVICE_API}/users`;

export default {
  getUsers: async (params) => {
    const limit = parseInt(process.env.VUE_APP_LIMIT, 10);
    const { data: { data: users } } = await axios.get(usersApi, { params: { limit, ...params } });
    return users;
  },
  updateUser: async (body) => axios.put(`${usersApi}/${body.id}`, body)
    .then((response) => response.data)
    .catch((error) => error.response.data),
  getUserPermissions: async (userId) => {
    const { data: { data: permissions } } = await axios.get(`${usersApi}/${userId}/permissions`);
    return permissions;
  },
  updateRole: async ({ userId, role }) => {
    await axios.put(`${usersApi}/${userId}/role`, { role });
  },
  getUserProfile: async ({ userId }) => {
    const { data: { data: user } } = await axios.get(`${usersApi}/${userId}`);
    return user;
  },
  getUser: async () => {
    const { data: { data: user } } = await axios.get(`${usersApi}/me`);
    return user;
  },
};
