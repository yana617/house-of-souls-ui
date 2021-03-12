import axios from 'axios';

import mock from './mock';

export default {
  getAdditionalFields: async () => {
    // TO-DO: Remove mocks
    await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return mock.additionalFieldsMock.map((field) => ({ ...field, id: field.id.toString() }));
  },
  updateAdditionalField: async (updatedAdditionalField) => {
    // TO-DO: Remove mocks
    await axios.post('https://jsonplaceholder.typicode.com/posts', updatedAdditionalField);
  },
  deleteAdditionalField: async ({ id } = {}) => {
    // TO-DO: Remove mocks
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  },
  saveAdditionalField: async (body = {}) => {
    await axios.post('https://jsonplaceholder.typicode.com/posts', body);
  },
  // eslint-disable-next-line no-unused-vars
  uploadIcon: async (formData) => {
    await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return 'https://image.flaticon.com/icons/png/512/91/91544.png';
  },
};
