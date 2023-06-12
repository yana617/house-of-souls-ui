import axios from 'axios';

const { VUE_APP_HOS_SERVICE: HOS_SERVICE_API } = process.env;
const noticesApi = `${HOS_SERVICE_API}/notices`;

export default {
  getNotices: async () => axios
    .get(noticesApi)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  getNoticeById: async ({ _id }) => axios
    .get(`${noticesApi}/${_id}`)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  updateNotice: async ({ _id, ...body }) => axios
    .put(`${noticesApi}/${_id}`, body)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  createNotice: async (body) => axios.post(noticesApi, body)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  deleteNotice: async ({ _id }) => axios
    .delete(`${noticesApi}/${_id}`)
    .catch((error) => error.response.data),
};
