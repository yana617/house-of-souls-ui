const SET_MODAL = 'SET_MODAL';

// initial state
const state = () => ({
  modal: null,
});

const getters = {};

const actions = {
  setModal: async ({ commit }, modal) => {
    commit(SET_MODAL, modal);
  },
};

const mutations = {
  [SET_MODAL](state, modal) {
    state.modal = modal;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
