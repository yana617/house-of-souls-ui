import axios from 'axios';

const { VUE_APP_AUTH_SERVICE: AUTH_SERVICE_API } = process.env;

const uafApi = `${AUTH_SERVICE_API}/user-additional-fields`;

export default {
  getUserAdditionalFields: async () => axios
    .get(`${uafApi}/me`)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  updateUserAdditionalField: async ({ id, value }) => axios
    .put(`${uafApi}/${id}`, { value })
    .catch((error) => error.response.data),
};
