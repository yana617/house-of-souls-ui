import { platformsApi } from '@/api/platforms';

const SET_PLATFORMS = 'SET_PLATFORMS';

const state = () => ({
  list: [],
});

const getters = {};

const actions = {
  getPlatforms: async ({ commit }) => {
    const response = await platformsApi.getPlatforms();
    if (response.success) {
      commit(SET_PLATFORMS, response.data);
    }
  },
  createPlatform: async (_, params = {}) => {
    await platformsApi.createPlatform(params);
  },
  deletePlatform: async (_, id) => {
    await platformsApi.deletePlatform(id);
  },
};

const mutations = {
  [SET_PLATFORMS](state, result) {
    state.list = result;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
