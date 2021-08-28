import { createStore } from 'vuex';

import users from './modules/users';
import additionalFields from './modules/additional-fields';
import userAdditionalFields from './modules/user-additional-fields';
import notices from './modules/notice';
import claim from './modules/claim';
import historyActions from './modules/history-actions';
import app from './modules/app';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    app,
    users,
    notices,
    claim,
    additionalFields,
    userAdditionalFields,
    historyActions,
  },
  strict: debug,
});
