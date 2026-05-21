import axios from 'axios';

import { MATERIALS_URL } from './constants';

export const materialsApi = {
  getMaterials: async () =>
    axios
      .get(MATERIALS_URL)
      .then((response) => response.data)
      .catch((error) => error.response.data),

  updateMaterials: async (body) =>
    axios
      .put(MATERIALS_URL, body)
      .then((response) => response.data)
      .catch((error) => error.response.data),
};
