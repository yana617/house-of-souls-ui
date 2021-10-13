import axios from 'axios';

const { VUE_APP_HOS_SERVICE: HOS_SERVICE_API } = process.env;
const noticesApi = `${HOS_SERVICE_API}/notices`;

export default {
  getNotices: async () => {
    const { data: { data: notices } } = await axios.get(noticesApi);
    return notices;
  },
  getNoticeById: async ({ _id }) => {
    const { data: { data: notice } } = await axios.get(`${noticesApi}/${_id}`);
    return notice;
  },
  updateNotice: async ({ _id, ...body }) => axios.put(`${noticesApi}/${_id}`, body)
    .then((response) => response.data)
    .catch((error) => error.response.data),
  createNotice: async (body) => axios.post(noticesApi, body)
    .then((response) => response.data)
    .catch((error) => error.response.data),
  deleteNotice: async ({ _id }) => {
    await axios.delete(`${noticesApi}/${_id}`);
    return true;
  },
};
