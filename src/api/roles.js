import axios from 'axios';

import { ROLES_URL } from './constants';

export const rolesApi = {
  getRoles: async () => axios
    .get(ROLES_URL)
    .then((response) => response.data)
    .catch((error) => error.response.data),
};
