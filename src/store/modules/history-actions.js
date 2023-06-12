import historyActions from '../../api/history-actions';

const SET_HISTORY_ACTIONS = 'SET_HISTORY_ACTIONS';
const LOAD_MORE_HISTORY_ACTIONS = 'LOAD_MORE_HISTORY_ACTIONS';
const ADD_HISTORY_ACTION = 'ADD_HISTORY_ACTION';
const UPDATE_ON_NEW_HISTORY_ACTION_EVENT_TRIGGERED = 'UPDATE_ON_NEW_HISTORY_ACTION_EVENT_TRIGGERED';

const state = () => ({
  list: null,
  total: 0,
  onNewHistoryActionEventTriggered: false,
});

const getters = {};

const actions = {
  getHistoryActions: async ({ commit }, params = {}) => {
    const response = await historyActions.getHistoryActions(params);
    if (response.success) {
      commit(SET_HISTORY_ACTIONS, response.data);
    }
  },
  loadMoreHistoryActions: async ({ commit }, params = {}) => {
    const response = await historyActions.getHistoryActions(params);
    if (response.success) {
      commit(LOAD_MORE_HISTORY_ACTIONS, response.data);
    }
  },
  addHistoryAction: async ({ commit }, action) => {
    commit(ADD_HISTORY_ACTION, action);
  },
  onNewHistoryActionEventTriggerHandled: async ({ commit }) => {
    commit(UPDATE_ON_NEW_HISTORY_ACTION_EVENT_TRIGGERED, false);
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
    state.list = [action, ...(state.list || [])];
    state.total += 1;
    state.onNewHistoryActionEventTriggered = true;
  },
  [UPDATE_ON_NEW_HISTORY_ACTION_EVENT_TRIGGERED](state, action) {
    state.onNewHistoryActionEventTriggered = action;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
