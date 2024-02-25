/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import axios from 'axios';

import mock from './mock';

const { VUE_APP_ANIMAL_SERVICE: ANIMAL_SERVICE_API } = process.env;
const animalsApi = `${ANIMAL_SERVICE_API}/animal-medical-history`;

export default {
  getLastMedicalItem: async (params) => {
    // const { data: { data } } = await axios.get(`${animalsApi}/last`, { params });
    // return data;
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((r) => setTimeout(r, 2000));
    return mock.lastMedicalItem;
  },
};
