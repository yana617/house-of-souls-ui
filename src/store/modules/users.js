import users from '../../api/users';

const SET_VOLUNTEERS = 'SET_VOLUNTEERS';
const LOAD_MORE_VOLUNTEERS = 'LOAD_MORE_VOLUNTEERS';

// initial state
const state = () => ({
  volunteers: [],
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
};

const mutations = {
  [SET_VOLUNTEERS](state, result) {
    state.volunteers = result.volunteers;
    state.total = result.total;
  },
  [LOAD_MORE_VOLUNTEERS](state, result) {
    state.volunteers = state.volunteers.concat(result.volunteers);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
