import historyActions from '../../api/history-actions';

const SET_HISTORY_ACTIONS = 'SET_HISTORY_ACTIONS';
const LOAD_MORE_HISTORY_ACTIONS = 'LOAD_MORE_HISTORY_ACTIONS';
const ADD_HISTORY_ACTION = 'ADD_HISTORY_ACTION';

const state = () => ({
  list: null,
  total: 0,
});

const getters = {};

const actions = {
  getHistoryActions: async ({ commit }, params = {}) => {
    const list = await historyActions.getHistoryActions(params);
    commit(SET_HISTORY_ACTIONS, list);
  },
  loadMoreHistoryActions: async ({ commit }, params = {}) => {
    const list = await historyActions.getHistoryActions(params);
    commit(LOAD_MORE_HISTORY_ACTIONS, list);
  },
  addHistoryAction: async ({ commit }, action) => {
    commit(ADD_HISTORY_ACTION, action);
  },
};

const mutations = {
  [SET_HISTORY_ACTIONS](state, result) {
    state.list = result.historyActions;
    state.total = result.total;
  },
  [LOAD_MORE_HISTORY_ACTIONS](state, result) {
    state.list = state.list.concat(result.historyActions);
  },
  [ADD_HISTORY_ACTION](state, action) {
    state.list = [action, ...state.list];
    state.total += 1;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
