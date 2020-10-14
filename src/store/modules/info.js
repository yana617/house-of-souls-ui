import info from '../../api/info';

const SET_INFO = 'SET_INFO';

// initial state
const state = () => ({
  actualInfo: [],
});

const getters = {};

const actions = {
  getInfo: async ({ commit }, params = {}) => {
    const result = await info.getInfo(params);
    commit(SET_INFO, result);
  },
};

const mutations = {
  [SET_INFO](state, result) {
    state.actualInfo = result;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
