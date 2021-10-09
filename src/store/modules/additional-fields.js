import additionalFields from '../../api/additional-fields';

const SET_ADDITIONAL_FIELDS = 'SET_ADDITIONAL_FIELDS';
const SET_NEW_ADDITIONAL_FIELD_ICON_LINK = 'SET_NEW_ADDITIONAL_FIELD_ICON_LINK';
const UPDATE_ADDITIONAL_FIELD = 'UPDATE_ADDITIONAL_FIELD';
const SET_CREATE_ERRORS = 'SET_CREATE_ERRORS';
const SET_UPDATE_ERRORS = 'SET_UPDATE_ERRORS';

const state = () => ({
  current: null,
  new: {
    icon: null,
  },
  createErrors: [],
  updateErrors: [],
});

const getters = {};

const actions = {
  getAdditionalFields: async ({ commit }) => {
    const additionalFieldTemplates = await additionalFields.getAdditionalFields();
    commit(SET_ADDITIONAL_FIELDS, additionalFieldTemplates);
  },
  updateAdditionalField: async ({ commit }, body = {}) => {
    const response = await additionalFields.updateAdditionalField(body);
    if (response.success) {
      commit(SET_UPDATE_ERRORS, []);
    } else if (response.errors) {
      commit(SET_UPDATE_ERRORS, response.errors);
    }
  },
  deleteAdditionalField: async (_, { id } = {}) => {
    await additionalFields.deleteAdditionalField({ id });
  },
  uploadIcon: async ({ commit }, formData) => {
    const link = await additionalFields.uploadIcon(formData);
    commit(SET_NEW_ADDITIONAL_FIELD_ICON_LINK, link);
  },
  createAdditionalField: async ({ commit }, body) => {
    commit(SET_CREATE_ERRORS, []);
    const response = await additionalFields.createAdditionalField(body);
    if (response.errors) {
      commit(SET_CREATE_ERRORS, response.errors);
    }
  },
  clearCreateErrors: async ({ commit }) => {
    commit(SET_CREATE_ERRORS, []);
  },
  localUpdateAdditionalField: async ({ commit }, { field, id }) => {
    commit(UPDATE_ADDITIONAL_FIELD, { field, id });
  },
};

const mutations = {
  [SET_ADDITIONAL_FIELDS](state, fields) {
    state.current = fields;
  },
  [SET_NEW_ADDITIONAL_FIELD_ICON_LINK](state, link) {
    state.new = { ...state.new, icon: link };
  },
  [UPDATE_ADDITIONAL_FIELD](state, { field = {}, id }) {
    const fields = state.current;
    const foundIndex = fields.findIndex((f) => f.id === id);
    fields[foundIndex] = field;
    state.current = fields;
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
