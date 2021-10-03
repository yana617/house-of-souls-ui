import axios from 'axios';

const { VUE_APP_AUTH_SERVICE: AUTH_SERVICE_API } = process.env;

export default {
  getRoles: async () => {
    const { data: { data: roles } } = await axios.get(`${AUTH_SERVICE_API}/roles`);
    return roles;
  },
};
