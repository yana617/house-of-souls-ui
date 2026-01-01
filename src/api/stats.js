import axios from 'axios';

import { STATS_ANIMAL_URL, STATS_HOS_URL } from './constants';

export const statsApi = {
  getUsersPerMonth: async () =>
    axios
      .get(`${STATS_HOS_URL}/users-per-month`)
      .then((response) => response.data)
      .catch((error) => error.response.data),

  getAnimalsPerAge: async () =>
    axios
      .get(`${STATS_ANIMAL_URL}/animals-per-age`)
      .then((response) => response.data)
      .catch((error) => error.response.data),

  getAdoptedPerMonth: async () =>
    axios
      .get(`${STATS_ANIMAL_URL}/adopted-per-month`)
      .then((response) => response.data)
      .catch((error) => error.response.data),

  getAdsPerTime: async (type = "week") =>
    axios
      .get(`${STATS_ANIMAL_URL}/ads-per-time?type=${type}`)
      .then((response) => response.data)
      .catch((error) => error.response.data),
};
