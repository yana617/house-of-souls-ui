import permissions from '../../api/permissions';

const SET_PERMISSIONS = 'SET_PERMISSIONS';

const state = () => ({
  list: [],
});

const getters = {};

const actions = {
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
