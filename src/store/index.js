import { createStore } from 'vuex';

import users from './modules/users';
import additionalFields from './modules/additional-fields';
import userAdditionalFields from './modules/user-additional-fields';
import notices from './modules/notice';
import claim from './modules/claim';
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
    users,
    notices,
    claim,
    additionalFields,
    userAdditionalFields,
    roles,
    permissions,
  },
  strict: debug,
});
