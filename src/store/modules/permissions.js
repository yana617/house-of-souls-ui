import { permissionsApi } from '@/api/permissions';

const SET_PERMISSIONS = 'SET_PERMISSIONS';
const SET_MY_PERMISSIONS = 'SET_MY_PERMISSIONS';

const state = () => ({
  list: [],
  my: [],
  loaded: false,
});

const getters = {};

const actions = {
  getMyPermissions: async ({ commit }) => {
    const response = await permissionsApi.getMyPermissions();
    if (response.success) {
      commit(SET_MY_PERMISSIONS, response.data);
    }
  },
  resetPermissions: async ({ commit }) => {
    commit(SET_MY_PERMISSIONS, []);
  },
  getPermissions: async ({ commit }) => {
    const response = await permissionsApi.getPermissions();
    if (response.success) {
      commit(SET_PERMISSIONS, response.data);
    }
  },
  updatePermissions: async (_, { userId, permissions: permissionsToUpdate } = {}) => {
    await permissionsApi.updatePermissions({ userId, permissions: permissionsToUpdate });
  },
};

const mutations = {
  [SET_PERMISSIONS](state, result) {
    state.list = result;
  },
  [SET_MY_PERMISSIONS](state, result) {
    state.my = result;
    state.loaded = true;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
