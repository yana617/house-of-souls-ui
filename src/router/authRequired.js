import { getToken } from '../utils/sessionStorage';

const authRequired = (router) => {
  router.beforeEach((to, from, next) => {
    if (to.meta.authRequired) {
      if (!getToken()) {
        router.push({
          name: 'home',
          query: {
            to: to.name,
          },
        });
      }
    }
    return next();
  });
};

export default authRequired;
