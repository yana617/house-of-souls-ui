import { claimsApi } from '@/api/claims';

const SET_CURRENT_SCHEDULE = 'SET_CURRENT_SCHEDULE';
const SET_NEXT_WEEK_SCHEDULE = 'SET_NEXT_WEEK_SCHEDULE';
const SET_PERSONAL_CLAIMS = 'SET_PERSONAL_CLAIMS';
const SET_CREATE_ERRORS = 'SET_CREATE_ERRORS';
const SET_UPDATE_ERRORS = 'SET_UPDATE_ERRORS';
const SET_RATING = 'SET_RATING';

const state = () => ({
  currentSchedule: null,
  nextWeekSchedule: null,
  personal: [],
  createErrors: [],
  updateErrors: [],
  rating: null,
});

const getters = {};

const actions = {
  getSchedule: async ({ commit }, params = {}) => {
    const mappedClaims = await claimsApi.getClaims(params);
    if (mappedClaims) {
      commit(SET_CURRENT_SCHEDULE, mappedClaims);
    }
  },
  getNextWeekSchedule: async ({ commit }, params = {}) => {
    const mappedClaims = await claimsApi.getClaims(params);
    if (mappedClaims) {
      commit(SET_NEXT_WEEK_SCHEDULE, mappedClaims);
    }
  },
  getClaimsByUserId: async ({ commit }, params = {}) => {
    const response = await claimsApi.getClaimsByUserId(params);
    if (response.success) {
      commit(SET_PERSONAL_CLAIMS, response.data);
    }
  },
  createClaim: async ({ commit }, body = {}) => {
    const response = await claimsApi.createClaim(body);
    if (response.success) {
      commit(SET_CREATE_ERRORS, []);
    } else if (response.errors) {
      commit(SET_CREATE_ERRORS, response.errors);
    }
  },
  updateClaim: async ({ commit }, body = {}) => {
    const response = await claimsApi.updateClaim(body);
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
    await claimsApi.deleteClaim({ _id });
  },
  getRating: async ({ commit }) => {
    const response = await claimsApi.getRating();
    if (response.success) {
      commit(SET_RATING, response.data);
    }
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
  [SET_RATING](state, result) {
    state.rating = result;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
