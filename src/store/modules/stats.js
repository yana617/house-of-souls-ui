import { statsApi } from '@/api/stats';

const SET_USERS_PER_MONTH = 'SET_USERS_PER_MONTH';
const SET_ANIMALS_PER_AGE = 'SET_ANIMALS_PER_AGE';
const SET_ADOPTED_PER_MONTH = 'SET_ADOPTED_PER_MONTH';
const SET_ADS_PER_WEEK = 'SET_ADS_PER_WEEK';
const SET_ADS_PER_MONTH = 'SET_ADS_PER_MONTH';

const state = () => ({
  usersPerMonth: null,
  animalsPerAge: null,
  adoptedPerMonth: null,
  adsPerWeek: null,
  adsPerMonth: null,
});

const getters = {};

const actions = {
  getUsersPerMonth: async ({ commit }) => {
    const response = await statsApi.getUsersPerMonth();
    if (response.success) {
      commit(SET_USERS_PER_MONTH, response.data);
    }
  },
  getAnimalsPerAge: async ({ commit }) => {
    const response = await statsApi.getAnimalsPerAge();
    if (response.success) {
      commit(SET_ANIMALS_PER_AGE, response.data);
    }
  },
  getAdoptedPerMonth: async ({ commit }) => {
    const response = await statsApi.getAdoptedPerMonth();
    if (response.success) {
      commit(SET_ADOPTED_PER_MONTH, response.data);
    }
  },
  getAdsPerWeek: async ({ commit }) => {
    const response = await statsApi.getAdsPerTime();
    if (response.success) {
      commit(SET_ADS_PER_WEEK, response.data);
    }
  },
  getAdsPerMonth: async ({ commit }) => {
    const response = await statsApi.getAdsPerTime('month');
    if (response.success) {
      commit(SET_ADS_PER_MONTH, response.data);
    }
  },
  clearStats: async ({ commit }) => {
    commit(SET_USERS_PER_MONTH, null);
    commit(SET_ANIMALS_PER_AGE, null);
    commit(SET_ADOPTED_PER_MONTH, null);
    commit(SET_ADS_PER_WEEK, null);
    commit(SET_ADS_PER_MONTH, null);
  },
};

const mutations = {
  [SET_USERS_PER_MONTH](state, result) {
    state.usersPerMonth = result;
  },
  [SET_ANIMALS_PER_AGE](state, result) {
    state.animalsPerAge = result;
  },
  [SET_ADOPTED_PER_MONTH](state, result) {
    state.adoptedPerMonth = result;
  },
  [SET_ADS_PER_WEEK](state, result) {
    state.adsPerWeek = result;
  },
  [SET_ADS_PER_MONTH](state, result) {
    state.adsPerMonth = result;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
