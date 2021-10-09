import axios from 'axios';

const { VUE_APP_AUTH_SERVICE: AUTH_SERVICE_API } = process.env;

const aftUrl = `${AUTH_SERVICE_API}/additional-field-templates`;

export default {
  getAdditionalFields: async () => {
    const { data: { data: result } } = await axios.get(aftUrl);
    return result;
  },
  updateAdditionalField: async (updatedAdditionalField) => axios.put(`${aftUrl}/${updatedAdditionalField.id}`,
    updatedAdditionalField)
    .then((response) => response.data)
    .catch((error) => error.response.data),
  deleteAdditionalField: async ({ id } = {}) => {
    await axios.delete(`${aftUrl}/${id}`);
  },
  createAdditionalField: async (body = {}) => axios.post(aftUrl, body)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  // eslint-disable-next-line no-unused-vars
  uploadIcon: async (formData) => {
    await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return 'https://image.flaticon.com/icons/png/512/91/91544.png';
  },
};
