import axios from 'axios';

const { VUE_APP_HOS_SERVICE: HOS_SERVICE_API } = process.env;

export default {
  getNotices: async () => {
    const { data: { data: notices } } = await axios.get(`${HOS_SERVICE_API}/notices`);
    return notices;
  },
  getNoticeById: async ({ _id }) => {
    const { data: { data: notice } } = await axios.get(`${HOS_SERVICE_API}/notices/${_id}`);
    return notice;
  },
  updateNotice: async ({ _id, ...body }) => axios.put(`${HOS_SERVICE_API}/notices/${_id}`, body)
    .then((response) => response.data)
    .catch((error) => error.response.data),
  createNotice: async (body) => axios.post(`${HOS_SERVICE_API}/notices`, body)
    .then((response) => response.data)
    .catch((error) => error.response.data),
  deleteNotice: async ({ _id }) => {
    await axios.delete(`${HOS_SERVICE_API}/notices/${_id}`);
    return true;
  },
};
