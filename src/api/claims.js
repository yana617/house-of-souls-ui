import axios from 'axios';

import claimsMapper from '@/utils/claimsMapper';
import mock from './mock';

const { VUE_APP_HOS_SERVICE: HOS_SERVICE_API } = process.env;
const claimsApi = `${HOS_SERVICE_API}/claims`;
const usersApi = `${HOS_SERVICE_API}/users`;

export default {
  getClaims: async ({ from, to }) => {
    const { data: { data: claims } } = await axios.get(`${claimsApi}?from=${from}&to=${to}`);
    return claimsMapper({ from, to, claims });
  },
  getClaimsByUserId: async ({ userId } = {}) => {
    const { data: { data: claims } } = await axios.get(`${usersApi}/${userId}/claims`);
    return { claims };
  },
  createClaim: async (body) => axios.post(claimsApi, body)
    .then((response) => response.data)
    .catch((error) => error.response.data),
  updateClaim: async (claim) => axios.patch(`${claimsApi}/${claim._id}`, claim)
    .then((response) => response.data)
    .catch((error) => error.response.data),
  deleteClaim: async ({ _id } = {}) => {
    await axios.delete(`${claimsApi}/${_id}`);
  },
  // eslint-disable-next-line arrow-body-style
  getRating: async () => {
    // const { data: { data: rating } } = await axios.get(`${claimsApi}/rating`);
    return mock.generateRating();
  },
};
