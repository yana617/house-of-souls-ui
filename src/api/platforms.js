import axios from 'axios';

import { PLATFORMS_URL } from './constants';

export const platformsApi = {
  getPlatforms: async () =>
    axios
      .get(PLATFORMS_URL)
      .then((response) => response.data)
      .catch((error) => error.response.data),

  createPlatform: async (body) =>
    axios
      .post(PLATFORMS_URL, body)
      .then((response) => response.data)
      .catch((error) => error.response.data),

  deletePlatform: async (id) =>
    axios
      .delete(`${PLATFORMS_URL}/${id}`)
      .then((response) => response.data)
      .catch((error) => error.response.data),
};
