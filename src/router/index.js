import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import authRequired from './authRequired';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/volunteers',
    name: 'volunteers',
    component: () => import(/* webpackChunkName: "volunteers" */ '../views/Volunteers.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "volunteers" */ '../views/Profile.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import(/* webpackChunkName: "volunteers" */ '../views/ForgotPassword.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import(/* webpackChunkName: "volunteers" */ '../views/ResetPassword.vue'),
  }, {
    path: '/users/:id',
    name: 'user',
    component: () => import(/* webpackChunkName: "volunteers" */ '../views/Profile.vue'),
    meta: { authRequired: true },
  }, {
    path: '/rating',
    name: 'rating',
    component: () => import(/* webpackChunkName: "volunteers" */ '../views/Rating.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    redirect: '/admin/volunteers-requests',
    component: () => import(/* webpackChunkName: "admin" */ '../views/AdminPanel.vue'),
    children: [{
      path: '/admin/volunteers-requests',
      meta: { authRequired: true },
      name: 'volunteers-requests',
      component: () => import(/* webpackChunkName: "admin" */ '../views/VolunteersRequests.vue'),
    }, {
      path: '/admin/register-fields-control',
      meta: { authRequired: true },
      name: 'register-fields-control',
      component: () => import(/* webpackChunkName: "admin" */ '../views/RegisterFieldsControl.vue'),
    }, {
      path: '/admin/notices',
      meta: { authRequired: true },
      name: 'notices',
      component: () => import(/* webpackChunkName: "admin" */ '../views/NoticesControl.vue'),
    }],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

authRequired(router);

export default router;
