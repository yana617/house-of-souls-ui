import axios from 'axios';

import mock from './mock';

const mapClaims = (response) => {
  const { from, to, claims } = response;
  const fromDate = new Date(from);
  const dates = {};
  const result = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(fromDate.getTime() + i * 24 * 60 * 60 * 1000);
    dates[date.toLocaleDateString('ru-RU')] = i;
    return { date, morning: [], evening: [] };
  });

  claims.forEach((claim) => {
    const date = new Date(claim.date).toLocaleDateString('ru-RU');
    const dayIndex = dates[date];
    if (result[dayIndex]) {
      result[dayIndex][claim.type].push(claim);
    }
  });
  return { from, to, claims: result };
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
