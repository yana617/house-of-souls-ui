import users from '../../api/users';

const SET_USERS = 'SET_USERS';
const LOAD_MORE_USERS = 'LOAD_MORE_USERS';
const SET_USER = 'SET_USER';

// initial state
const state = () => ({
  list: [],
  user: null,
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
  register: async ({ commit }, body = {}) => {
    const user = await users.register(body);
    commit(SET_USER, user);
    commit('app/SET_MODAL', null, { root: true });
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
