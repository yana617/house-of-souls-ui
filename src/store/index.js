import { createStore } from 'vuex';

import users from './modules/users';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users,
  },
  strict: debug,
});
