import axios from 'axios';

import { API_HOST } from '@/constants';

export default {
  getUserAdditionalFields: async ({ userId }) => {
    const { data: { userAdditionalFields } } = await axios.get(`${API_HOST}/user-additional-fields?userId=${userId}`);
    return userAdditionalFields;
  },
  updateUserAdditionalField: async ({ _id, value }) => {
    await axios.patch(`${API_HOST}/user-additional-fields/${_id}?value=${value}`);
  },
};
