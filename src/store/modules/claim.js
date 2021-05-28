import claim from '../../api/claim';

const SET_CURRENT_SCHEDULE = 'SET_CURRENT_SCHEDULE';
const SET_NEXT_WEEK_SCHEDULE = 'SET_NEXT_WEEK_SCHEDULE';

// initial state
const state = () => ({
  currentSchedule: null,
  nextWeekSchedule: null,
});

const getters = {};

const actions = {
  getSchedule: async ({ commit }, params = {}) => {
    const result = await claim.getClaims(params);
    commit(SET_CURRENT_SCHEDULE, result);
  },
  getNextWeekSchedule: async ({ commit }, params = {}) => {
    const result = await claim.getClaims(params);
    commit(SET_NEXT_WEEK_SCHEDULE, result);
  },
  createClaim: async (_, body = {}) => {
    await claim.createClaim(body);
  },
};

const mutations = {
  [SET_CURRENT_SCHEDULE](state, result) {
    state.currentSchedule = result;
  },
  [SET_NEXT_WEEK_SCHEDULE](state, result) {
    state.nextWeekSchedule = result;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
