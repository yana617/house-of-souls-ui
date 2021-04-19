/* eslint-disable no-unused-vars */
import additionalFields from '../../api/additional-fields';

const SET_ADDITIONAL_FIELDS = 'SET_ADDITIONAL_FIELDS';
const SET_NEW_ADDITIONAL_FIELD_ICON_LINK = 'SET_NEW_ADDITIONAL_FIELD_ICON_LINK';
const UPDATE_ADDITIONAL_FIELD = 'UPDATE_ADDITIONAL_FIELD';

// initial state
const state = () => ({
  current: null,
  new: {
    icon: null,
  },
});

const getters = {};

const actions = {
  getAdditionalFields: async ({ commit }) => {
    const fields = await additionalFields.getAdditionalFields();
    commit(SET_ADDITIONAL_FIELDS, fields);
  },
  updateAdditionalField: async ({ commit }, body = {}) => {
    await additionalFields.updateAdditionalField(body);
  },
  deleteAdditionalField: async ({ commit }, { _id } = {}) => {
    await additionalFields.deleteAdditionalField({ _id });
  },
  uploadIcon: async ({ commit }, formData) => {
    const link = await additionalFields.uploadIcon(formData);
    commit(SET_NEW_ADDITIONAL_FIELD_ICON_LINK, link);
  },
  saveAdditionalField: async ({ commit }, body) => {
    await additionalFields.saveAdditionalField(body);
  },
  localUpdateAdditionalField: async ({ commit }, { field, _id }) => {
    commit(UPDATE_ADDITIONAL_FIELD, { field, _id });
  },
};

const mutations = {
  [SET_ADDITIONAL_FIELDS](state, fields) {
    state.current = fields;
  },
  [SET_NEW_ADDITIONAL_FIELD_ICON_LINK](state, link) {
    state.new = { ...state.new, icon: link };
  },
  [UPDATE_ADDITIONAL_FIELD](state, { field = {}, _id }) {
    const fields = state.current;
    const foundIndex = fields.findIndex((f) => f._id === _id);
    fields[foundIndex] = field;
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
