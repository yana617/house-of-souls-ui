import notifications from '@/utils/notifications';
import { authApi } from '@/api/auth';

const SET_USER = 'SET_USER';
const SET_REGISTER_ERRORS = 'SET_REGISTER_ERRORS';
const SET_FORGOT_PASSWORD_ERRORS = 'SET_FORGOT_PASSWORD_ERRORS';
const SET_RESET_PASSWORD_ERRORS = 'SET_RESET_PASSWORD_ERRORS';
const SET_RESET_LINK = 'SET_RESET_LINK';

const state = () => ({
  user: null,
  registerErrors: [],
  forgotPasswordErrors: [],
  resetPasswordErrors: [],
  resetLink: null,
});

const getters = {};

const actions = {
  login: async ({ commit }, body = {}) => {
    const response = await authApi.login(body);
    if (response.success) {
      commit(SET_USER, response.data);
      commit('app/SET_MODAL', null, { root: true });
    }
  },
  register: async ({ commit }, body = {}) => {
    const response = await authApi.register(body);
    if (response.success) {
      commit(SET_USER, response.data);
      commit('app/SET_MODAL', null, { root: true });
    } else if (response.errors) {
      commit(SET_REGISTER_ERRORS, response.errors);
    }
  },
  clearRegisterErrors: ({ commit }) => {
    commit(SET_REGISTER_ERRORS, []);
  },
  forgotPassword: async ({ commit }, body = {}) => {
    const response = await authApi.forgotPassword(body);
    if (response.success) {
      commit(SET_RESET_LINK, response.data);
    }
  },
  resetPassword: async ({ commit }, body = {}) => {
    const response = await authApi.resetPassword(body);
    if (response.success) {
      notifications.success('Пароль успешно обновлен!');
      return;
    }
    if (response.errors) {
      commit(SET_RESET_PASSWORD_ERRORS, response.errors);
    } else {
      commit(SET_RESET_PASSWORD_ERRORS, []);
    }
  },
};

const mutations = {
  [SET_USER](state, user) {
    state.user = user;
  },
  [SET_REGISTER_ERRORS](state, errors) {
    state.registerErrors = errors;
  },
  [SET_FORGOT_PASSWORD_ERRORS](state, errors) {
    state.forgotPasswordErrors = errors;
  },
  [SET_RESET_PASSWORD_ERRORS](state, errors) {
    state.resetPasswordErrors = errors;
  },
  [SET_RESET_LINK](state, link) {
    state.resetLink = link;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
