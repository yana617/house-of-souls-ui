import axios from 'axios';

import claimsMapper from '@/utils/claimsMapper';

import { CLAIMS_URL, HOS_USERS_URL } from './constants';

export const claimsApi = {
  getClaims: async ({ from, to }) => {
    const response = await axios
      .get(`${CLAIMS_URL}?from=${from}&to=${to}`)
      .then((res) => res.data)
      .catch((error) => error.response.data);

    if (response.success) {
      return claimsMapper({ from, to, claims: response.data });
    }
    return null;
  },

  getClaimsByUserId: async ({ userId } = {}) => axios
    .get(`${HOS_USERS_URL}/${userId}/claims`)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  createClaim: async (body) => axios
    .post(CLAIMS_URL, body)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  updateClaim: async (claim) => axios
    .patch(`${CLAIMS_URL}/${claim._id}`, claim)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  deleteClaim: async ({ _id } = {}) => axios
    .delete(`${CLAIMS_URL}/${_id}`)
    .catch((error) => error.response.data),

  getRating: async () => axios
    .get(`${CLAIMS_URL}/rating`)
    .then((response) => response.data)
    .catch((error) => error.response.data),
};
