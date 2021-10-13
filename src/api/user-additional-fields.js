import axios from 'axios';

const { VUE_APP_AUTH_SERVICE: AUTH_SERVICE_API } = process.env;

const uafApi = `${AUTH_SERVICE_API}/user-additional-fields`;

export default {
  getUserAdditionalFields: async () => {
    const { data: { data: userAdditionalFields } } = await axios.get(`${uafApi}/me`);
    return userAdditionalFields;
  },
  updateUserAdditionalField: async ({ id, value }) => {
    const { data } = await axios.put(`${uafApi}/${id}`, { value });
    return data;
  },
};
