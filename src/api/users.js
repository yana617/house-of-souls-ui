import axios from 'axios';

import mock from './mock';

export default {
  getUsers: async (params) => {
    // TO-DO: Remove with mocks
    const limit = parseInt(process.env.VUE_APP_LIMIT, 10);
    await axios.get('https://jsonplaceholder.typicode.com/todos/1', { params: { limit, ...params } });
    return mock.usersMock;
  },
  login: async (body) => {
    // TO-DO: Remove mocks
    await axios.post('https://jsonplaceholder.typicode.com/posts', body);
    return mock.generateUser();
  },
  register: async (body) => {
    // TO-DO: Remove mocks
    await axios.post('https://jsonplaceholder.typicode.com/posts', body);
    return mock.generateUser();
  },
};
