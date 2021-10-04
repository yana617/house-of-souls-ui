import users from '../../api/users';

const SET_USERS = 'SET_USERS';
const LOAD_MORE_USERS = 'LOAD_MORE_USERS';
const SET_PERMISSIONS = 'SET_PERMISSIONS';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_UPDATE_ERRORS = 'SET_USER_UPDATE_ERRORS';

const state = () => ({
  list: [],
  userProfile: null,
  permissions: {
    userPermissions: [],
    rolePermissions: [],
  },
  userUpdateErrors: [],
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
  getUser: async ({ commit }) => {
    const user = await users.getUser();
    commit('auth/SET_USER', user, { root: true });
  },
  updateUser: async ({ commit }, body = {}) => {
    commit(SET_USER_UPDATE_ERRORS, []);
    const response = await users.updateUser(body);
    if (response.success) {
      commit('auth/SET_USER', response.data, { root: true });
    } else if (response.errors) {
      commit(SET_USER_UPDATE_ERRORS, response.errors);
    }
  },
  getUserPermissions: async ({ commit }, userId) => {
    const result = await users.getUserPermissions(userId);
    commit(SET_PERMISSIONS, result);
  },
  updateRole: async (_, { userId, role } = {}) => {
    await users.updateRole({ userId, role });
  },
  getUserProfile: async ({ commit }, { userId }) => {
    const result = await users.getUserProfile({ userId });
    commit(SET_USER_PROFILE, result);
  },
  clearUser: ({ commit }) => {
    commit('auth/SET_USER', null, { root: true });
  },
  clearUserProfile: ({ commit }) => {
    commit(SET_USER_PROFILE, null);
  },
};

const mutations = {
  [SET_USERS](state, result) {
    state.list = result;
    // state.list = result.users;
    // state.total = result.total;
  },
  [LOAD_MORE_USERS](state, result) {
    // result.users
    state.list = state.list.concat(result);
  },
  [SET_PERMISSIONS](state, result) {
    state.permissions = result;
  },
  [SET_USER_PROFILE](state, result) {
    state.userProfile = result;
  },
  [SET_USER_UPDATE_ERRORS](state, errors) {
    state.userUpdateErrors = errors;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
