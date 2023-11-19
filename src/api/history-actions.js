import axios from 'axios';

import { HISTORY_ACTIONS_URL, LIMIT } from './constants';

export const historyActionsApi = {
  getHistoryActions: async (params) => axios
    .get(HISTORY_ACTIONS_URL, { params: { limit: LIMIT, ...params } })
    .then((res) => res.data)
    .catch((error) => error.response.data),
};
