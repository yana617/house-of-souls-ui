const SET_MODAL = 'SET_MODAL';
const SET_LOADING = 'SET_LOADING';

// initial state
const state = () => ({
  modal: null,
  loading: false,
});

const getters = {};

const actions = {
  setModal: async ({ commit }, modal) => {
    commit(SET_MODAL, modal);
  },
  setLoading: async ({ commit }, loading) => {
    commit(SET_LOADING, loading);
  },
};

const mutations = {
  [SET_MODAL](state, modal) {
    state.modal = modal;
  },
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
