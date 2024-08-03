import axios from 'axios';

import { AFT_URL } from './constants';

export const aftApi = {
  getAdditionalFields: async () => axios
    .get(AFT_URL)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  updateAdditionalField: async (updatedAdditionalField) => axios
    .put(`${AFT_URL}/${updatedAdditionalField.id}`, updatedAdditionalField)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  deleteAdditionalField: async ({ id } = {}) => axios
    .delete(`${AFT_URL}/${id}`)
    .catch((error) => error.response.data),

  createAdditionalField: async (body = {}) => axios.post(AFT_URL, body)
    .then((response) => response.data)
    .catch((error) => error.response.data),
};
