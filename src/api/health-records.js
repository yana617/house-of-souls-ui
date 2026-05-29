import axios from 'axios';

import { ANIMALS_URL } from './constants';

export const HealthRecordType = {
  VACCINE: 'vaccine',
  DEWORMING: 'deworming',
  FLEAS_AND_TICKS: 'fleas-and-ticks',
  VET_VISIT: 'vet-visit',
  LAB_TEST: 'lab-test',
};

export const healthRecordsApi = {
  createHealthRecord: async (animalId, body) =>
    axios
      .post(`${ANIMALS_URL}/${animalId}/health-records`, body)
      .then((response) => response.data)
      .catch((error) => error.response.data),

  deleteHealthRecord: async (animalId, recordId) =>
    axios
      .delete(`${ANIMALS_URL}/${animalId}/health-records/${recordId}`)
      .then((response) => response.data)
      .catch((error) => error.response.data),
};

export default healthRecordsApi;
