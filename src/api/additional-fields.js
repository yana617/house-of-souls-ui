import axios from 'axios';

import { API_HOST } from '@/constants';

export default {
  getAdditionalFields: async () => {
    const { data: { additionalFieldTemplates } } = await axios.get(`${API_HOST}/additional-field-templates`);
    return additionalFieldTemplates;
  },
  updateAdditionalField: async (updatedAdditionalField) => {
    // TO-DO: Remove mocks
    await axios.post('https://jsonplaceholder.typicode.com/posts', updatedAdditionalField);
  },
  deleteAdditionalField: async ({ _id } = {}) => {
    // TO-DO: Remove mocks
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${_id}`);
  },
  saveAdditionalField: async (body = {}) => {
    await axios.post(`${API_HOST}/additional-field-templates`, body);
  },
  // eslint-disable-next-line no-unused-vars
  uploadIcon: async (formData) => {
    await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return 'https://image.flaticon.com/icons/png/512/91/91544.png';
  },
};
