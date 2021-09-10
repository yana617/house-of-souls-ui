import axios from 'axios';
import { API_HOST } from '@/constants';

const { VUE_APP_AUTH_SERVICE: AUTH_SERVICE_API } = process.env;

export default {
  getAdditionalFields: async () => {
    const { data } = await axios.get(`${AUTH_SERVICE_API}/additional-field-templates`);
    return data;
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
