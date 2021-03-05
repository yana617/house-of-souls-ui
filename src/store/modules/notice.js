import notices from '../../api/notice';

const SET_NOTICES = 'SET_NOTICES';

// initial state
const state = () => ({
  actualNotices: [],
});

const getters = {};

const actions = {
  getNotices: async ({ commit }, params = {}) => {
    const result = await notices.getNotices(params);
    commit(SET_NOTICES, result);
  },
  updateNotice: async (commit, params = {}) => {
    await notices.updateNotice(params);
  },
  saveNotice: async (commit, params = {}) => {
    await notices.saveNotice(params);
  },
  deleteNotice: async (commit, params = {}) => {
    await notices.deleteNotice(params);
  },
};

const mutations = {
  [SET_NOTICES](state, result) {
    state.actualNotices = result;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
