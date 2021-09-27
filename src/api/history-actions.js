import axios from 'axios';

const { VUE_APP_HOS_SERVICE: API_HOST } = process.env;

export default {
  getHistoryActions: async () => {
    const { data: { data } } = await axios.get(`${API_HOST}/history-actions`);
    return data;
  },
};
