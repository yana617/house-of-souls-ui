 
 
// import axios from 'axios';

import mock from './mock';

// const { VITE_ANIMAL_SERVICE: ANIMAL_SERVICE_API } = import.meta.env;
// const animalsApi = `${ANIMAL_SERVICE_API}/animal-medical-history`;

export default {
  getLastMedicalItem: async () => {
    // const { data: { data } } = await axios.get(`${animalsApi}/last`, { params });
    // return data;
    await new Promise((r) => setTimeout(r, 2000));
    return mock.lastMedicalItem;
  },
};
