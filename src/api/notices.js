import axios from 'axios';

import { NOTICES_URL } from './constants';

export const noticesApi = {
  getNotices: async ({ animal_id } = {}) =>
    axios
      .get(`${NOTICES_URL}${animal_id ? `?animal_id=${animal_id}` : ''}`)
      .then((response) => response.data)
      .catch((error) => error.response.data),

  getNoticeById: async ({ _id }) =>
    axios
      .get(`${NOTICES_URL}/${_id}`)
      .then((response) => response.data)
      .catch((error) => error.response.data),

  updateNotice: async ({ _id, ...body }) =>
    axios
      .put(`${NOTICES_URL}/${_id}`, body)
      .then((response) => response.data)
      .catch((error) => error.response.data),

  createNotice: async (body) =>
    axios
      .post(NOTICES_URL, body)
      .then((response) => response.data)
      .catch((error) => error.response.data),

  deleteNotice: async ({ _id }) =>
    axios.delete(`${NOTICES_URL}/${_id}`).catch((error) => error.response.data),
};
