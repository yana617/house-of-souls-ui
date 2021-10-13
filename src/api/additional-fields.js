import axios from 'axios';

const { VUE_APP_AUTH_SERVICE: AUTH_SERVICE_API } = process.env;

const aftApi = `${AUTH_SERVICE_API}/additional-field-templates`;

export default {
  getAdditionalFields: async () => {
    const { data: { data: result } } = await axios.get(aftApi);
    return result;
  },
  updateAdditionalField: async (updatedAdditionalField) => axios.put(`${aftApi}/${updatedAdditionalField.id}`,
    updatedAdditionalField)
    .then((response) => response.data)
    .catch((error) => error.response.data),
  deleteAdditionalField: async ({ id } = {}) => {
    await axios.delete(`${aftApi}/${id}`);
  },
  createAdditionalField: async (body = {}) => axios.post(aftApi, body)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  // eslint-disable-next-line no-unused-vars
  uploadIcon: async (formData) => {
    await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return 'https://image.flaticon.com/icons/png/512/91/91544.png';
  },
};
