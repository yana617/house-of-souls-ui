import axios from 'axios';

const { VUE_APP_AUTH_SERVICE: AUTH_SERVICE_API } = process.env;
const rolesApi = `${AUTH_SERVICE_API}/roles`;

export default {
  getRoles: async () => axios
    .get(rolesApi)
    .then((response) => response.data)
    .catch((error) => error.response.data),
};
