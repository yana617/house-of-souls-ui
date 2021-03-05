import axios from 'axios';

import mock from './mock';

export default {
  getNotices: async () => {
    // TO-DO: Remove with mocks
    await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return mock.noticesMock;
  },
  updateNotice: async (body) => {
    // TO-DO: Remove with mocks
    await axios.get('https://jsonplaceholder.typicode.com/todos/1', body);
    return mock.noticesMock[0];
  },
  saveNotice: async (body) => {
    await axios.put('https://jsonplaceholder.typicode.com/todos/1', body);
  },
  deleteNotice: async (body) => {
    await axios.put('https://jsonplaceholder.typicode.com/todos/1', body);
  },
};
