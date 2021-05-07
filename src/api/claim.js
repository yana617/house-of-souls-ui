import axios from 'axios';

import { API_HOST } from '@/constants';

const mapClaims = (response) => {
  const { from, to, claims } = response;
  const fromDate = new Date(from);
  const dates = {};
  let mappedClaims = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(fromDate.getTime() + i * 24 * 60 * 60 * 1000);
    dates[date.toLocaleDateString('ru-RU')] = i;
    return { date, morning: [], evening: [] };
  });

  mappedClaims = claims.reduce((result, claim) => {
    const date = new Date(claim.date).toLocaleDateString('ru-RU');
    const dayIndex = dates[date];
    if (result[dayIndex]) {
      result[dayIndex][claim.type].push(claim);
    }
    return result;
  }, mappedClaims);
  return { from, to, claims: mappedClaims };
};
// result structure:
// [{ date: String, morning: [claims], evening: [claims] }]

export default {
  getClaims: async ({ from, to }) => {
    const { data: { claims } } = await axios.get(`${API_HOST}/claims?from=${from}&to=${to}`);
    return mapClaims({ from, to, claims });
  },
  createClaim: async (body) => {
    await axios.post(`${API_HOST}/claims`, { claim: body });
  },
  deleteClaim: async ({ _id } = {}) => {
    await axios.delete(`${API_HOST}/claims/${_id}`);
  },
};
