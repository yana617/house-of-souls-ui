import roles from '../../api/roles';

const SET_ROLES = 'SET_ROLES';

const state = () => ({
  list: [],
});

const getters = {};

const actions = {
  getRoles: async ({ commit }) => {
    const result = await roles.getRoles();
    commit(SET_ROLES, result);
  },
};

const mutations = {
  [SET_ROLES](state, result) {
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
