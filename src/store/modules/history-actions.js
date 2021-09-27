import historyActions from '../../api/history-actions';

const SET_HISTORY_ACTIONS = 'SET_HISTORY_ACTIONS';
const ADD_HISTORY_ACTION = 'ADD_HISTORY_ACTION';

const state = () => ({
  list: null,
});

const getters = {};

const actions = {
  getHistoryActions: async ({ commit }) => {
    const list = await historyActions.getHistoryActions();
    commit(SET_HISTORY_ACTIONS, list);
  },
  addHistoryAction: async ({ commit }, action) => {
    commit(ADD_HISTORY_ACTION, action);
  },
};

const mutations = {
  [SET_HISTORY_ACTIONS](state, result) {
    state.list = result;
  },
  [ADD_HISTORY_ACTION](state, action) {
    state.list = [action, ...state.list];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
