import axios from 'axios';

import { ADS_URL } from './constants';

export const adsApi = {
  getAds: async ({ sortByPlatform, sortOrder } = {}) =>
    axios
      .get(`${ADS_URL}${sortByPlatform ? `?sortByPlatform=${sortByPlatform}&sortOrder=${sortOrder}` : ''}`)
      .then((response) => response.data)
      .catch((error) => error.response.data),

  createAd: async (body) =>
    axios
      .post(ADS_URL, body)
      .then((response) => response.data)
      .catch((error) => error.response.data),
};
