import axios from 'axios';

import mock from './mock';

export default {
  getVolunteers: async (params) => {
    // TO-DO: Remove with mocks
    console.log('params', params);
    const limit = parseInt(process.env.VUE_APP_LIMIT, 10);
    await axios.get('https://jsonplaceholder.typicode.com/todos/1', { params: { limit, ...params } });
    return mock.volunteersMock;
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
  getAdditionalFields: async () => {
    // TO-DO: Remove mocks
    await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return mock.additionalFieldsMock.map((field) => ({ ...field, id: field.id.toString() }));
  },
};
