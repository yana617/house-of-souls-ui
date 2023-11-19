import { uafApi } from '@/api/user-additional-fields';

const SET_USER_ADDITIONAL_FIELDS = 'SET_USER_ADDITIONAL_FIELDS';

const state = () => ({
  current: null,
});

const getters = {};

const actions = {
  getUserAdditionalFields: async ({ commit }) => {
    const response = await uafApi.getUserAdditionalFields();
    if (response.success) {
      commit(SET_USER_ADDITIONAL_FIELDS, response.data);
    }
  },
  updateUserAdditionalField: async (_, { id, value } = {}) => {
    await uafApi.updateUserAdditionalField({ id, value });
  },
};

const mutations = {
  [SET_USER_ADDITIONAL_FIELDS](state, fields) {
    state.current = fields;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
