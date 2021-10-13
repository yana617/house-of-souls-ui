import axios from 'axios';

import { API_HOST } from '@/constants';
import { MS_IN_DAY_AMOUNT } from '@/utils/date';

const getDayMock = (date) => ({
  date,
  morning: [],
  evening: [],
});

const generateDatesRange = (fromTimeStamp, toTimeStamp) => {
  const iterateDate = new Date(fromTimeStamp);
  const range = [];

  do {
    range.push(getDayMock(new Date(iterateDate)));
  } while (iterateDate.setHours(24) <= toTimeStamp);

  return range;
};

const mapClaims = (response) => {
  const { from, to, claims } = response;

  const fromTimeStamp = new Date(from).setHours(0, 0, 0, 0);
  const toTimeStamp = new Date(to).setHours(0, 0, 0, 0);

  return {
    from,
    to,
    claims: claims.reduce((result, claim) => {
      const currentDate = new Date(claim.date);
      const currentTimeStamp = currentDate.setHours(0, 0, 0, 0);

      if (currentTimeStamp > toTimeStamp || currentTimeStamp < fromTimeStamp) return result;

      const dayIndex = Math.floor((currentTimeStamp - fromTimeStamp) / MS_IN_DAY_AMOUNT);
      const day = result[dayIndex];
      const current = [];

      current[dayIndex] = {
        ...day,
        [claim.type]: [
          ...day[claim.type],
          claim,
        ],
      };

      return Object.assign([], result, current);
    }, generateDatesRange(fromTimeStamp, toTimeStamp)),
  };
};
// result structure:
// [{ date: String, morning: [claims], evening: [claims] }]

export default {
  getClaims: async ({ from, to }) => {
    const { data: { claims } } = await axios.get(`${API_HOST}/claims?from=${from}&to=${to}`);
    return mapClaims({ from, to, claims });
  },
  getClaimsByUserId: async ({ userId } = {}) => {
    const { data: { claims, total } } = await axios.get(`${API_HOST}/claims/${userId}`);
    return { claims, total };
  },
  createClaim: async (body) => {
    await axios.post(`${API_HOST}/claims`, { claim: body });
  },
  updateClaim: async (body) => {
    await axios.patch(`${API_HOST}/claims`, { claim: body });
  },
  deleteClaim: async ({ _id } = {}) => {
    await axios.delete(`${API_HOST}/claims/${_id}`);
  },
};
