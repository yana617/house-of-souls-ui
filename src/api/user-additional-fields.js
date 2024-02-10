import axios from 'axios';

import { UAF_URL } from './constants';

export const uafApi = {
  getUserAdditionalFields: async () => axios
    .get(`${UAF_URL}/me`)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  updateUserAdditionalField: async ({ id, value }) => axios
    .put(`${UAF_URL}/${id}`, { value })
    .catch((error) => error.response.data),
};
