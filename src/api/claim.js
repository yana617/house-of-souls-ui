import axios from 'axios';

import { MS_IN_DAY_AMOUNT } from '@/utils/date';

import mock from './mock';

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

export default {
  getClaims: async (params) => {
    // TO-DO: Remove with mocks
    await axios.get('https://jsonplaceholder.typicode.com/todos/1', { params });
    return mapClaims({ from: params.from, to: params.to, claims: mock.generateClaims(params.from, params.to) });
  },
  createClaim: async (body) => {
    await axios.post('https://jsonplaceholder.typicode.com/todos', { body });
    return body;
  },
};
