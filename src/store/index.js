import { createStore } from 'vuex';

import users from './modules/users';
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
  },
  strict: debug,
});
