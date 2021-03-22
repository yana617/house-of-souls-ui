import axios from 'axios';

import { API_HOST } from '@/constants';

export default {
  getNotices: async () => {
    const { data: { notices } } = await axios.get(`${API_HOST}/notices`);
    return notices;
  },
  getNoticeById: async ({ _id }) => {
    const { data: { notice } } = await axios.get(`${API_HOST}/notices/${_id}`);
    return notice;
  },
  updateNotice: async ({ _id, ...body }) => {
    const { data: { notice } } = await axios.patch(
      `${API_HOST}/notices/${_id}`,
      { notice: body },
    );
    return notice;
  },
  createNotice: async (body) => {
    const { data: { notice } } = await axios.post(`${API_HOST}/notices`, { notice: body });
    return notice;
  },
  deleteNotice: async ({ _id }) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${_id}`);
    return true;
  },
};
