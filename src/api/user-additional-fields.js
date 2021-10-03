import axios from 'axios';

const { VUE_APP_AUTH_SERVICE: AUTH_SERVICE_API } = process.env;

const url = `${AUTH_SERVICE_API}/user-additional-fields`;

export default {
  getUserAdditionalFields: async () => {
    const { data: { data: userAdditionalFields } } = await axios.get(`${url}/me`);
    return userAdditionalFields;
  },
  updateUserAdditionalField: async ({ _id, value }) => {
    const { data } = await axios.put(`${url}/${_id}`, { value });
    return data;
  },
};
