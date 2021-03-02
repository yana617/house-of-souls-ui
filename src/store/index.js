import { createStore } from 'vuex';

import users from './modules/users';
import info from './modules/info';
import schedule from './modules/schedule';
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
    info,
    schedule,
  },
  strict: debug,
});
