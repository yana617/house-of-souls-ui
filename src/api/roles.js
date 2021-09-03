import axios from 'axios';

import { API_HOST } from '@/constants';

export default {
  getRoles: async () => {
    const { data: { roles } } = await axios.get(`${API_HOST}/roles`);
    return roles;
  },
};
