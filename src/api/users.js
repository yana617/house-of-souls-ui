import axios from 'axios';

import { LIMIT, AUTH_USERS_URL } from './constants';

export const usersApi = {
  getUsers: async (params) => {
    let rolesPrettified = params.roles || undefined;
    if (rolesPrettified.includes(",")) {
      rolesPrettified = rolesPrettified.split(',');
    }

    return axios
      .get(AUTH_USERS_URL, { params: { limit: LIMIT, ...params, roles: rolesPrettified } })
      .then((response) => response.data)
      .catch((error) => error.response.data);
  },

  updateUser: async (body) =>
    axios
      .put(`${AUTH_USERS_URL}/${body.id}`, body)
      .then((response) => response.data)
      .catch((error) => error.response.data),

  getUserPermissions: async (userId) =>
    axios
      .get(`${AUTH_USERS_URL}/${userId}/permissions`)
      .then((response) => response.data)
      .catch((error) => error.response.data),

  updateRole: async ({ userId, role }) =>
    axios.put(`${AUTH_USERS_URL}/${userId}/role`, { role }).catch((error) => error.response.data),

  getUserProfile: async ({ userId }) =>
    axios
      .get(`${AUTH_USERS_URL}/${userId}`)
      .then((response) => response.data)
      .catch((error) => error.response.data),

  getUser: async () =>
    axios
      .get(`${AUTH_USERS_URL}/me`)
      .then((response) => response.data)
      .catch((error) => error.response.data),

  getCurator: async ({ userId }) =>
    axios
      .get(`${AUTH_USERS_URL}/${userId}/curator`)
      .then((response) => response.data)
      .catch((error) => error.response.data),

  getCurators: async () =>
    axios
      .get(`${AUTH_USERS_URL}/curators`)
      .then((response) => response.data)
      .catch((error) => error.response.data),

  getBirthdayPeople: async () =>
    axios
      .get(`${AUTH_USERS_URL}/birthday`)
      .then((response) => response.data)
      .catch((error) => error.response.data),
};
