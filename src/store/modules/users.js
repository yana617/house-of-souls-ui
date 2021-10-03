import users from '../../api/users';
import notifications from '@/utils/notifications';

const SET_USERS = 'SET_USERS';
const LOAD_MORE_USERS = 'LOAD_MORE_USERS';
const SET_USER = 'SET_USER';
const SET_PERMISSIONS = 'SET_PERMISSIONS';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_REGISTER_ERRORS = 'SET_REGISTER_ERRORS';
const SET_FORGOT_PASSWORD_ERRORS = 'SET_FORGOT_PASSWORD_ERRORS';
const SET_RESET_PASSWORD_ERRORS = 'SET_RESET_PASSWORD_ERRORS';
const SET_USER_UPDATE_ERRORS = 'SET_USER_UPDATE_ERRORS';

const state = () => ({
  list: [],
  user: null,
  userProfile: null,
  permissions: {
    userPermissions: [],
    rolePermissions: [],
  },
  registerErrors: [],
  forgotPasswordValidationErrors: [],
  resetPasswordValidationErrors: [],
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
  login: async ({ commit }, body = {}) => {
    const response = await users.login(body);
    if (response.success) {
      commit(SET_USER, response.data);
      commit('app/SET_MODAL', null, { root: true });
    }
  },
  getUser: async ({ commit }) => {
    const user = await users.getUser();
    commit(SET_USER, user);
  },
  logout: async ({ commit }) => {
    await users.logout();
    commit(SET_USER, null);
  },
  register: async ({ commit }, body = {}) => {
    commit(SET_REGISTER_ERRORS, []);
    const response = await users.register(body);
    if (response.success) {
      commit(SET_USER, response.data);
      commit('app/SET_MODAL', null, { root: true });
    } else if (response.errors) {
      commit(SET_REGISTER_ERRORS, response.errors);
    }
  },
  updateUser: async ({ commit }, body = {}) => {
    commit(SET_USER_UPDATE_ERRORS, []);
    const response = await users.updateUser(body);
    if (response.success) {
      commit(SET_USER, response.data);
    } else if (response.errors) {
      commit(SET_USER_UPDATE_ERRORS, response.errors);
    }
  },
  forgotPassword: async ({ commit }, body = {}) => {
    const response = await users.forgotPassword(body);
    if (response.success) {
      notifications.success('Проверяйте почту :)', 'Сообщение на почту успешно отправлено!');
      return;
    }
    if (response.errors) {
      commit(SET_FORGOT_PASSWORD_ERRORS, response.errors);
    } else {
      commit(SET_FORGOT_PASSWORD_ERRORS, []);
    }
  },
  resetPassword: async ({ commit }, body = {}) => {
    const response = await users.resetPassword(body);
    if (response.success) {
      notifications.success('Проверяйте почту :)', 'Сообщение на почту успешно отправлено!');
      return;
    }
    if (response.errors) {
      commit(SET_RESET_PASSWORD_ERRORS, response.errors);
    } else {
      commit(SET_RESET_PASSWORD_ERRORS, []);
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
    commit(SET_USER, null);
  },
  clearUserProfile: ({ commit }) => {
    commit(SET_USER_PROFILE, null);
  },
};

const mutations = {
  [SET_USERS](state, result) {
    state.list = result;
    // state.total = result.total;
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
  [SET_USER_PROFILE](state, result) {
    state.userProfile = result;
  },
  [SET_REGISTER_ERRORS](state, errors) {
    state.registerErrors = errors;
  },
  [SET_FORGOT_PASSWORD_ERRORS](state, errors) {
    state.forgotPasswordValidationErrors = errors;
  },
  [SET_RESET_PASSWORD_ERRORS](state, errors) {
    state.resetPasswordValidationErrors = errors;
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
