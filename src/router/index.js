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
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "volunteers" */ '../views/Profile.vue'),
  },
  {
    path: '/users/:id',
    component: () => import(/* webpackChunkName: "volunteers" */ '../views/Profile.vue'),
  },
  {
    path: '/restore-password',
    name: 'RestorePassword',
    component: () => import(/* webpackChunkName: "volunteers" */ '../views/RestorePassword.vue'),
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: () => import(/* webpackChunkName: "admin" */ '../views/AdminPanel.vue'),
    children: [{
      path: 'volunteers-requests',
      component: () => import(/* webpackChunkName: "admin" */ '../views/VolunteersRequests.vue'),
    }, {
      path: 'register-fields-control',
      component: () => import(/* webpackChunkName: "admin" */ '../views/RegisterFieldsControl.vue'),
    }, {
      path: 'notices-control',
      component: () => import(/* webpackChunkName: "admin" */ '../views/NoticesControl.vue'),
    }],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
