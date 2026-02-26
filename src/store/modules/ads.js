import { adsApi } from "@/api/ads";

const SET_ADS = 'SET_ADS';

const state = () => ({
  list: [],
});

const getters = {};

const actions = {
  getAds: async ({ commit }, query) => {
    const response = await adsApi.getAds(query);
    if (response.success) {
      commit(SET_ADS, response.data);
    }
  },
  createAd: async (_, body) => {
    await adsApi.createAd(body);
  },
};

const mutations = {
  [SET_ADS](state, result) {
    state.list = result;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
