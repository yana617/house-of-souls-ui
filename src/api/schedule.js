import axios from 'axios';

import mock from './mock';

export default {
  getSchedule: async (params) => {
    // TO-DO: Remove with mocks
    await axios.get('https://jsonplaceholder.typicode.com/todos/1', { params });
    return mock.generateSchedule();
  },
};
