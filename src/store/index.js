import { createStore } from 'vuex';

import auth from './modules/auth';
import users from './modules/users';
import additionalFields from './modules/additional-fields';
import userAdditionalFields from './modules/user-additional-fields';
import historyActions from './modules/history-actions';
import notices from './modules/notices';
import claims from './modules/claims';
import roles from './modules/roles';
import permissions from './modules/permissions';
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
    auth,
    users,
    notices,
    claims,
    additionalFields,
    userAdditionalFields,
    historyActions,
    roles,
    permissions,
  },
  strict: debug,
});
