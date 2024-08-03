import animalMedicalHistory from '../../api/animal-medical-history';

const GET_LAST_MEDICAL_ITEM = 'GET_LAST_MEDICAL_ITEM';

const state = () => ({
  last: null,
});

const getters = {};

const actions = {
  getLastMedicalItem: async ({ commit }, params = {}) => {
    const result = await animalMedicalHistory.getLastMedicalItem(params);
    commit(GET_LAST_MEDICAL_ITEM, result);
  },
};

const mutations = {
  [GET_LAST_MEDICAL_ITEM](state, result) {
    state.last = result;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
