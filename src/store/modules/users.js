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
    const response = await users.getUsers(params);
    if (response.success) {
      commit(SET_USERS, response.data);
    }
  },
  loadMoreUsers: async ({ commit }, params = {}) => {
    const response = await users.getUsers(params);
    if (response.success) {
      commit(LOAD_MORE_USERS, response.data);
    }
  },
  getUser: async ({ commit }) => {
    const response = await users.getUser();
    if (response.success) {
      commit('auth/SET_USER', response.data, { root: true });
    }
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
    const response = await users.getUserPermissions(userId);
    if (response.success) {
      commit(SET_PERMISSIONS, response.data);
    }
  },
  updateRole: async (_, { userId, role } = {}) => {
    await users.updateRole({ userId, role });
  },
  getUserProfile: async ({ commit }, { userId }) => {
    const response = await users.getUserProfile({ userId });
    if (response.success) {
      commit(SET_USER_PROFILE, response.data);
    }
  },
  clearUser: ({ commit }) => {
    commit('auth/SET_USER', null, { root: true });
  },
  clearUserProfile: ({ commit }) => {
    commit(SET_USER_PROFILE, null);
  },
  clearUsersList: ({ commit }) => {
    commit(SET_USERS, []);
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
