import users from '../../api/users';

const SET_USERS = 'SET_USERS';
const LOAD_MORE_USERS = 'LOAD_MORE_USERS';
const SET_USER = 'SET_USER';
const SET_PERMISSIONS = 'SET_PERMISSIONS';

// initial state
const state = () => ({
  list: [],
  user: null,
  permissions: {
    userPermissions: [],
    rolePermissions: [],
  },
});

const getters = {};

const actions = {
  getUsers: async ({ commit }, params = {}) => {
    const result = await users.getUsers(params);
    commit(SET_USERS, result);
  },
  loadMoreUsers: async ({ commit }, params = {}) => {
    const result = await users.getUsers(params);
    commit(LOAD_MORE_USERS, result);
  },
  login: async ({ commit }, body = {}) => {
    const user = await users.login(body);
    commit(SET_USER, user);
    commit('app/SET_MODAL', null, { root: true });
  },
  logout: async ({ commit }) => {
    await users.logout();
    commit(SET_USER, null);
  },
  register: async ({ commit }, body = {}) => {
    const user = await users.register(body);
    commit(SET_USER, user);
    commit('app/SET_MODAL', null, { root: true });
  },
  updateUser: async ({ commit }, body = {}) => {
    const user = await users.updateUser(body);
    commit(SET_USER, user);
  },
  restorePassword: async (_, body = {}) => {
    await users.restorePassword(body);
  },
  getUserPermissions: async ({ commit }) => {
    const result = await users.getUserPermissions();
    commit(SET_PERMISSIONS, result);
  },
  updateRole: async (_, { userId, role } = {}) => {
    await users.updateRole({ userId, role });
  },
};

const mutations = {
  [SET_USERS](state, result) {
    state.list = result.users;
    state.total = result.total;
  },
  [LOAD_MORE_USERS](state, result) {
    state.list = state.list.concat(result.users);
  },
  [SET_USER](state, user) {
    state.user = user;
  },
  [SET_PERMISSIONS](state, result) {
    state.permissions = result;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
