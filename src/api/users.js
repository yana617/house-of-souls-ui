import axios from 'axios';

const { VUE_APP_AUTH_SERVICE: AUTH_SERVICE_API } = process.env;
const usersApi = `${AUTH_SERVICE_API}/users`;

export default {
  getUsers: async (params) => {
    const limit = parseInt(process.env.VUE_APP_LIMIT, 10);
    return axios
      .get(usersApi, { params: { limit, ...params } })
      .then((response) => response.data)
      .catch((error) => error.response.data);
  },

  updateUser: async (body) => axios
    .put(`${usersApi}/${body.id}`, body)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  getUserPermissions: async (userId) => axios
    .get(`${usersApi}/${userId}/permissions`)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  updateRole: async ({ userId, role }) => axios
    .put(`${usersApi}/${userId}/role`, { role })
    .catch((error) => error.response.data),

  getUserProfile: async ({ userId }) => axios
    .get(`${usersApi}/${userId}`)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  getUser: async () => axios
    .get(`${usersApi}/me`)
    .then((response) => response.data)
    .catch((error) => error.response.data),
};
