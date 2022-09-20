/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import axios from 'axios';

import { API_HOST } from '@/constants';
import mock from './mock';

const { VUE_APP_ANIMAL_SERVICE: ANIMAL_SERVICE_API } = process.env;
const animalsApi = `${ANIMAL_SERVICE_API}/animals`;

export default {
  getAnimals: async (params) => {
    // const { data: { data: animals } } = await axios.get(animalsApi, { params });
    const { data: { data: animals } } = await axios.get(`${API_HOST}/animals`, { params });
    return animals;
  },

  getAnimalById: async ({ id }) => {
    // const { data: { data: animal } } = await axios.get(`${animalsApi}/${id}`);
    const { data: { data: animal } } = await axios.get(`${API_HOST}/animals/${id}`);
    return animal;
  },
};
