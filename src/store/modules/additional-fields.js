import { aftApi } from '@/api/additional-fields';

const SET_ADDITIONAL_FIELDS = 'SET_ADDITIONAL_FIELDS';
const SET_CREATE_ERRORS = 'SET_CREATE_ERRORS';
const SET_UPDATE_ERRORS = 'SET_UPDATE_ERRORS';

const state = () => ({
  all: null,
  createErrors: [],
  updateErrors: [],
});

const getters = {};

const actions = {
  getAdditionalFields: async ({ commit }) => {
    const response = await aftApi.getAdditionalFields();
    if (response.success) {
      commit(SET_ADDITIONAL_FIELDS, response.data);
    }
  },
  updateAdditionalField: async ({ commit }, body = {}) => {
    const response = await aftApi.updateAdditionalField(body);
    if (response.success) {
      commit(SET_UPDATE_ERRORS, []);
    } else if (response.errors) {
      commit(SET_UPDATE_ERRORS, response.errors);
    }
  },
  deleteAdditionalField: async (_, { id } = {}) => {
    await aftApi.deleteAdditionalField({ id });
  },
  createAdditionalField: async ({ commit }, body) => {
    commit(SET_CREATE_ERRORS, []);
    const response = await aftApi.createAdditionalField(body);
    if (response.errors) {
      commit(SET_CREATE_ERRORS, response.errors);
    }
  },
  clearCreateErrors: async ({ commit }) => {
    commit(SET_CREATE_ERRORS, []);
  },
};

const mutations = {
  [SET_ADDITIONAL_FIELDS](state, fields) {
    state.all = fields;
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
