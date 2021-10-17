/* eslint-disable no-unused-vars */
import userAdditionalFields from '../../api/user-additional-fields';

const SET_USER_ADDITIONAL_FIELDS = 'SET_USER_ADDITIONAL_FIELDS';

// initial state
const state = () => ({
  current: null,
});

const getters = {};

const actions = {
  getUserAdditionalFields: async ({ commit }) => {
    const fields = await userAdditionalFields.getUserAdditionalFields();
    commit(SET_USER_ADDITIONAL_FIELDS, fields);
  },
  updateUserAdditionalField: async ({ commit }, { id, value } = {}) => {
    await userAdditionalFields.updateUserAdditionalField({ id, value });
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
