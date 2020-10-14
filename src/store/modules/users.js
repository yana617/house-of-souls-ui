import users from '../../api/users';

const SET_VOLUNTEERS = 'SET_VOLUNTEERS';
const LOAD_MORE_VOLUNTEERS = 'LOAD_MORE_VOLUNTEERS';
const SET_USER = 'SET_USER';
const SET_ADDITIONAL_FIELDS = 'SET_ADDITIONAL_FIELDS';

// initial state
const state = () => ({
  volunteers: [],
  user: null,
  additionalFields: [],
});

const getters = {};

const actions = {
  getVolunteers: async ({ commit }, params = {}) => {
    const result = await users.getVolunteers(params);
    commit(SET_VOLUNTEERS, result);
  },
  loadMoreVolunteers: async ({ commit }, params = {}) => {
    const volunteers = await users.getVolunteers(params);
    commit(LOAD_MORE_VOLUNTEERS, volunteers);
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
  getAdditionalFields: async ({ commit }) => {
    const fields = await users.getAdditionalFields();
    commit(SET_ADDITIONAL_FIELDS, fields);
  },
};

const mutations = {
  [SET_VOLUNTEERS](state, result) {
    state.volunteers = result.volunteers;
    state.total = result.total;
  },
  [LOAD_MORE_VOLUNTEERS](state, result) {
    state.volunteers = state.volunteers.concat(result.volunteers);
  },
  [SET_USER](state, user) {
    state.user = user;
  },
  [SET_ADDITIONAL_FIELDS](state, fields) {
    state.additionalFields = fields;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
