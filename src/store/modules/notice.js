import notices from '../../api/notice';

const SET_NOTICES_LIST = 'SET_NOTICES_LIST';
const SET_NOTICE_DATA = 'SET_NOTICE_DATA';

// initial state
const state = () => ({
  list: [],
  data: {},
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
    const result = await notices.updateNotice(params);
    commit(SET_NOTICE_DATA, result);
  },
  createNotice: async (commit, params = {}) => {
    await notices.createNotice(params);
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
