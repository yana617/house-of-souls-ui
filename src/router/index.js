import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/volunteers',
    name: 'Volunteers',
    component: () => import(/* webpackChunkName: "volunteers" */ '../views/Volunteers.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "volunteers" */ '../views/Profile.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import(/* webpackChunkName: "volunteers" */ '../views/ForgotPassword.vue'),
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import(/* webpackChunkName: "volunteers" */ '../views/ResetPassword.vue'),
  }, {
    path: '/users/:id',
    component: () => import(/* webpackChunkName: "volunteers" */ '../views/Profile.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: () => import(/* webpackChunkName: "admin" */ '../views/AdminPanel.vue'),
    meta: { authRequired: true },
    children: [{
      path: 'volunteers-requests',
      component: () => import(/* webpackChunkName: "admin" */ '../views/VolunteersRequests.vue'),
      meta: { authRequired: true },
    }, {
      path: 'register-fields-control',
      component: () => import(/* webpackChunkName: "admin" */ '../views/RegisterFieldsControl.vue'),
      meta: { authRequired: true },
    }, {
      path: 'notices-control',
      component: () => import(/* webpackChunkName: "admin" */ '../views/NoticesControl.vue'),
      meta: { authRequired: true },
    }],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

require('./authRequired')(router);

export default router;
