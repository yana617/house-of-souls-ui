import claims from '../../api/claims';

const SET_CURRENT_SCHEDULE = 'SET_CURRENT_SCHEDULE';
const SET_NEXT_WEEK_SCHEDULE = 'SET_NEXT_WEEK_SCHEDULE';
const SET_PERSONAL_CLAIMS = 'SET_PERSONAL_CLAIMS';
const SET_CREATE_ERRORS = 'SET_CREATE_ERRORS';
const SET_UPDATE_ERRORS = 'SET_UPDATE_ERRORS';

const state = () => ({
  currentSchedule: null,
  nextWeekSchedule: null,
  personal: {},
  createErrors: [],
  updateErrors: [],
});

const getters = {};

const actions = {
  getSchedule: async ({ commit }, params = {}) => {
    const result = await claims.getClaims(params);
    commit(SET_CURRENT_SCHEDULE, result);
  },
  getNextWeekSchedule: async ({ commit }, params = {}) => {
    const result = await claims.getClaims(params);
    commit(SET_NEXT_WEEK_SCHEDULE, result);
  },
  getClaimsByUserId: async ({ commit }, params = {}) => {
    const result = await claims.getClaimsByUserId(params);
    commit(SET_PERSONAL_CLAIMS, result);
  },
  createClaim: async ({ commit }, body = {}) => {
    const response = await claims.createClaim(body);
    if (response.success) {
      commit(SET_CREATE_ERRORS, []);
    } else if (response.errors) {
      commit(SET_CREATE_ERRORS, response.errors);
    }
  },
  updateClaim: async ({ commit }, body = {}) => {
    const response = await claims.updateClaim(body);
    if (response.success) {
      commit(SET_UPDATE_ERRORS, []);
    } else if (response.errors) {
      commit(SET_UPDATE_ERRORS, response.errors);
    }
  },
  clearErrors: async ({ commit }) => {
    commit(SET_CREATE_ERRORS, []);
    commit(SET_UPDATE_ERRORS, []);
  },
  deleteClaim: async (_, { _id } = {}) => {
    await claims.deleteClaim({ _id });
  },
};

const mutations = {
  [SET_CURRENT_SCHEDULE](state, result) {
    state.currentSchedule = result;
  },
  [SET_NEXT_WEEK_SCHEDULE](state, result) {
    state.nextWeekSchedule = result;
  },
  [SET_PERSONAL_CLAIMS](state, result) {
    state.personal = result;
  },
  [SET_UPDATE_ERRORS](state, errors) {
    state.updateErrors = errors;
  },
  [SET_CREATE_ERRORS](state, errors) {
    state.createErrors = errors;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
