import { materialsApi } from '@/api/materials';

const SET_MATERIALS_LIST = 'SET_MATERIALS_LIST';

const state = () => ({
  list: [],
});

const getters = {};

const actions = {
  getMaterials: async ({ commit }, params = {}) => {
    const response = await materialsApi.getMaterials(params);
    if (response.success) {
      commit(SET_MATERIALS_LIST, response.data);
    }
  },

  updateMaterials: async (_, body = {}) => {
    await materialsApi.updateMaterials(body);
  },
};

const mutations = {
  [SET_MATERIALS_LIST](state, result) {
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
