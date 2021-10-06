import claim from '../../api/claim';

const SET_CURRENT_SCHEDULE = 'SET_CURRENT_SCHEDULE';
const SET_NEXT_WEEK_SCHEDULE = 'SET_NEXT_WEEK_SCHEDULE';
const SET_PERSONAL_CLAIMS = 'SET_PERSONAL_CLAIMS';

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
    const result = await claim.getClaims(params);
    commit(SET_CURRENT_SCHEDULE, result);
  },
  getNextWeekSchedule: async ({ commit }, params = {}) => {
    const result = await claim.getClaims(params);
    commit(SET_NEXT_WEEK_SCHEDULE, result);
  },
  getClaimsByUserId: async ({ commit }, params = {}) => {
    const result = await claim.getClaimsByUserId(params);
    commit(SET_PERSONAL_CLAIMS, result);
  },
  createClaim: async (_, body = {}) => {
    await claim.createClaim(body);
  },
  updateClaim: async (_, body = {}) => {
    await claim.updateClaim(body);
  },
  deleteClaim: async (_, { _id } = {}) => {
    await claim.deleteClaim({ _id });
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
