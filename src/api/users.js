import axios from 'axios';

import { LIMIT, AUTH_USERS_URL } from './constants';

export const usersApi = {
  getUsers: async (params) => axios
    .get(AUTH_USERS_URL, { params: { limit: LIMIT, ...params } })
    .then((response) => response.data)
    .catch((error) => error.response.data),

  updateUser: async (body) => axios
    .put(`${AUTH_USERS_URL}/${body.id}`, body)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  getUserPermissions: async (userId) => axios
    .get(`${AUTH_USERS_URL}/${userId}/permissions`)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  updateRole: async ({ userId, role }) => axios
    .put(`${AUTH_USERS_URL}/${userId}/role`, { role })
    .catch((error) => error.response.data),

  getUserProfile: async ({ userId }) => axios
    .get(`${AUTH_USERS_URL}/${userId}`)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  getUser: async () => axios
    .get(`${AUTH_USERS_URL}/me`)
    .then((response) => response.data)
    .catch((error) => error.response.data),
};
