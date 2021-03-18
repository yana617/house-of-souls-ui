import axios from 'axios';

import mock from './mock';

export default {
  getNotices: async () => {
    // TO-DO: Remove with mocks
    await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return mock.noticesIdsMock;
  },
  getNoticeById: async ({ _id }) => {
    // TO-DO: Remove with mocks
    await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return mock.generateNotice(_id);
  },
  updateNotice: async (body) => {
    // TO-DO: Remove with mocks
    await axios.put('https://jsonplaceholder.typicode.com/todos/1', body);
    return mock.generateNotice(body._id);
  },
  createNotice: async (body) => {
    await axios.post('https://jsonplaceholder.typicode.com/todos', body);
  },
  deleteNotice: async ({ _id }) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${_id}`);
  },
};
