const { getToken } = require('../utils/sessionStorage');

// const hasAccess = (name) => {
//   const permissions = localStorage.getItem('permissions');

//   switch (name) {
//     case 'home':
//       return true;
//     case 'users':
//       return permissions.includes('View All Users');
//     case 'permissions':
//       return permissions.includes('View All Permissions');
//     case 'roles':
//       return permissions.includes('View All Roles');
//     default:
//       return false;
//   }
// };

module.exports = (router) => {
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
