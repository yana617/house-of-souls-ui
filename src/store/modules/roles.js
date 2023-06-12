import roles from '../../api/roles';

const SET_ROLES = 'SET_ROLES';

const state = () => ({
  list: [],
});

const getters = {};

const actions = {
  getRoles: async ({ commit }) => {
    const response = await roles.getRoles();
    if (response.success) {
      commit(SET_ROLES, response.data);
    }
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
