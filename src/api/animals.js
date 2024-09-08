import axios from 'axios';
import dayjs from 'dayjs';

import AnimalStatus from '@/utils/enums/AnimalStatus';
import AnimalAge from '@/utils/enums/AnimalAge';
import DogHeight from '@/utils/enums/DogHeight';

const { VITE_ANIMAL_SERVICE: ANIMAL_SERVICE_API } = import.meta.env;
const ANIMALS_URL = `${ANIMAL_SERVICE_API}/animals`;

export default {
  getAnimals: async (params) => {
    const mappedParams = { ...params };
    mappedParams.status = params.status || AnimalStatus.HOMELESS;

    if (params.age) {
      if (params.age === AnimalAge.OVER_YEAR) {
        mappedParams.birthday_to = dayjs().subtract(1, 'year').toISOString();
      } else {
        mappedParams.birthday_from = dayjs().subtract(1, 'year').toISOString();
      }
      delete mappedParams.age;
    }
    if (params.height) {
      if (params.height === DogHeight.SMALL) {
        mappedParams.height_to = 38;
      } else if (params.height === DogHeight.MEDIUM) {
        mappedParams.height_from = 39;
        mappedParams.height_to = 50;
      } else {
        mappedParams.height_from = 51;
      }
      delete mappedParams.height;
    }

    return axios
      .get(ANIMALS_URL, { params: mappedParams })
      .then((response) => response.data)
      .catch((error) => error.response.data);
  },
  getAnimalById: async ({ id }) => axios
    .get(`${ANIMALS_URL}/${id}`)
    .then((response) => response.data)
    .catch((error) => error.response.data),
};
