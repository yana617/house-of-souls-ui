import axios from 'axios';

import claimsMapper from '@/utils/claimsMapper';

const { VUE_APP_HOS_SERVICE: HOS_SERVICE_API } = process.env;
const claimsApi = `${HOS_SERVICE_API}/claims`;
const usersApi = `${HOS_SERVICE_API}/users`;

export default {
  getClaims: async ({ from, to }) => {
    const response = await axios
      .get(`${claimsApi}?from=${from}&to=${to}`)
      .then((res) => res.data)
      .catch((error) => error.response.data);

    if (response.success) {
      return claimsMapper({ from, to, claims: response.data });
    }
    return null;
  },

  getClaimsByUserId: async ({ userId } = {}) => axios
    .get(`${usersApi}/${userId}/claims`)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  createClaim: async (body) => axios
    .post(claimsApi, body)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  updateClaim: async (claim) => axios
    .patch(`${claimsApi}/${claim._id}`, claim)
    .then((response) => response.data)
    .catch((error) => error.response.data),

  deleteClaim: async ({ _id } = {}) => axios
    .delete(`${claimsApi}/${_id}`)
    .catch((error) => error.response.data),

  getRating: async () => axios
    .get(`${claimsApi}/rating`)
    .then((response) => response.data)
    .catch((error) => error.response.data),
};
