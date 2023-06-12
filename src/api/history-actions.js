import axios from 'axios';

const { VUE_APP_HOS_SERVICE: API_HOST } = process.env;
const limit = parseInt(process.env.VUE_APP_LIMIT, 10);

export default {
  getHistoryActions: async (params) => axios
    .get(`${API_HOST}/history-actions`, { params: { limit, ...params } })
    .then((res) => res.data)
    .catch((error) => error.response.data),
};
