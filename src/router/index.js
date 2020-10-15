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
    path: '/admin',
    name: 'AdminPanel',
    component: () => import(/* webpackChunkName: "admin" */ '../views/AdminPanel.vue'),
    children: [{
      path: 'volunteers-requests',
      component: () => import(/* webpackChunkName: "admin" */ '../views/VolunteersRequests.vue'),
    }, {
      path: 'register-fields-control',
      component: () => import(/* webpackChunkName: "admin" */ '../views/RegisterFieldsControl.vue'),
    }],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
