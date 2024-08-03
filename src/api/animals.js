/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import axios from 'axios';

import mock from './mock';

const { VUE_APP_ANIMAL_SERVICE: ANIMAL_SERVICE_API } = process.env;
const animalsApi = `${ANIMAL_SERVICE_API}/animals`;

export default {
  getAnimals: async (params) => {
    const { data: { data: animals } } = await axios.get(animalsApi, { params });
    return animals;
  },

  getAnimalById: async ({ id }) => {
    // const { data: { data: animal } } = await axios.get(`${animalsApi}/${id}`);
    // return animal;
    await new Promise((r) => setTimeout(r, 1000));
    return mock.generateAnimal();
  },
};
