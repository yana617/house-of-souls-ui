import permissions from '../../api/permissions';

const SET_PERMISSIONS = 'SET_PERMISSIONS';
const SET_MY_PERMISSIONS = 'SET_MY_PERMISSIONS';

const state = () => ({
  list: [],
  my: [],
});

const getters = {};

const actions = {
  getMyPermissions: async ({ commit }) => {
    const result = await permissions.getMyPermissions();
    commit(SET_MY_PERMISSIONS, result);
  },
  resetPermissions: async ({ commit }) => {
    commit(SET_MY_PERMISSIONS, []);
  },
  getPermissions: async ({ commit }) => {
    const result = await permissions.getPermissions();
    commit(SET_PERMISSIONS, result);
  },
  updatePermissions: async (_, { userId, permissions: permissionsToUpdate } = {}) => {
    await permissions.updatePermissions({ userId, permissions: permissionsToUpdate });
  },
};

const mutations = {
  [SET_PERMISSIONS](state, result) {
    state.list = result;
  },
  [SET_MY_PERMISSIONS](state, result) {
    state.my = result;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
