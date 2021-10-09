import notices from '../../api/notice';

const SET_NOTICES_LIST = 'SET_NOTICES_LIST';
const SET_NOTICE_DATA = 'SET_NOTICE_DATA';
const SET_CREATE_ERRORS = 'SET_CREATE_ERRORS';
const SET_UPDATE_ERRORS = 'SET_UPDATE_ERRORS';

const state = () => ({
  list: [],
  data: {},
  createErrors: [],
  updateErrors: [],
});

const getters = {};

const actions = {
  getNotices: async ({ commit }, params = {}) => {
    const result = await notices.getNotices(params);
    commit(SET_NOTICES_LIST, result);
  },
  getNoticeById: async ({ commit }, params = {}) => {
    const result = await notices.getNoticeById(params);
    commit(SET_NOTICE_DATA, result);
  },
  updateNotice: async ({ commit }, params = {}) => {
    commit(SET_UPDATE_ERRORS, []);
    const response = await notices.updateNotice(params);
    if (response.success) {
      commit(SET_NOTICE_DATA, response.data);
    } else if (response.errors) {
      commit(SET_UPDATE_ERRORS, response.errors);
    }
  },
  createNotice: async ({ commit }, params = {}) => {
    const response = await notices.createNotice(params);
    if (response.success) {
      commit(SET_NOTICE_DATA, response.data);
    } else if (response.errors) {
      commit(SET_CREATE_ERRORS, response.errors);
    }
  },
  clearCreateErrors: async ({ commit }) => {
    commit(SET_CREATE_ERRORS, []);
  },
  deleteNotice: async (commit, params = {}) => {
    await notices.deleteNotice(params);
  },
};

const mutations = {
  [SET_NOTICES_LIST](state, result) {
    state.list = result;
  },
  [SET_NOTICE_DATA](state, result) {
    state.data[result._id] = result;
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
