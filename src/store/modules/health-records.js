import { healthRecordsApi } from '../../api/health-records';

const state = () => ({});

const getters = {};

const actions = {
  createHealthRecord: async (_, { animalId, body }) => {
    await healthRecordsApi.createHealthRecord(animalId, body);
  },

  deleteHealthRecord: async (_, { animalId, recordId }) => {
    await healthRecordsApi.deleteHealthRecord(animalId, recordId);
  },
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};