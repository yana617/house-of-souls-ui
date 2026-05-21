import { getToken } from '../utils/sessionStorage';

const authRequired = (router) => {
  router.beforeEach((to, _from, next) => {
    if (to.meta.authRequired && !getToken()) {
      return next({
        name: 'home',
        query: {
          to: to.name,
        },
      });
    }
    return next();
  });
};

export default authRequired;
