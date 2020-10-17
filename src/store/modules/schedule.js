import schedule from '../../api/schedule';

const SET_CURRENT_SCHEDULE = 'SET_CURRENT_SCHEDULE';
const SET_NEXT_WEEK_SCHEDULE = 'SET_NEXT_WEEK_SCHEDULE';

// initial state
const state = () => ({
  current: null,
  nextWeek: null,
});

const getters = {};

const actions = {
  getSchedule: async ({ commit }, params = {}) => {
    const result = await schedule.getSchedule(params);
    commit(SET_CURRENT_SCHEDULE, result);
  },
  getNextWeekSchedule: async ({ commit }, params = {}) => {
    const result = await schedule.getSchedule(params);
    commit(SET_NEXT_WEEK_SCHEDULE, result);
  },
};

const mutations = {
  [SET_CURRENT_SCHEDULE](state, result) {
    state.current = result;
  },
  [SET_NEXT_WEEK_SCHEDULE](state, result) {
    state.nextWeek = result;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
