import { createRouter, createWebHistory } from 'vue-router';

import authRequired from './authRequired';

const routes = [
  // PUBLIC
  {
    path: '/',
    name: 'animals',
    component: () => import('../views/AnimalList.vue'),
  },
  {
    path: '/animals/:id',
    name: 'animal',
    component: () => import('../views/Animal.vue'),
  },
  {
    path: '/how-to-help',
    name: 'how-to-help',
    component: () => import('../views/HowToHelp.vue'),
  },
  // PRIVATE
  {
    path: '/schedule',
    name: 'schedule',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/volunteers',
    name: 'volunteers',
    component: () => import('../views/Volunteers.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../views/ForgotPassword.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('../views/ResetPassword.vue'),
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/Profile.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/analytics',
    name: 'rating',
    component: () => import('../views/Rating.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/analytics',
    name: 'Analytics',
    redirect: '/analytics/rating',
    component: () => import('../views/Analytics.vue'),
    children: [
      {
        path: '/analytics/rating',
        meta: { authRequired: true },
        name: 'rating',
        component: () => import('../views/Rating.vue'),
      },
      {
        path: '/analytics/stats',
        meta: { authRequired: true },
        name: 'stats',
        component: () => import('../views/Stats.vue'),
      },
    ],
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../views/Map.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/animals/:id/edit',
    name: 'edit-animal',
    component: () => import('../views/EditAnimal.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/animals/:id/photos',
    name: 'update-animal-photos',
    component: () => import('../views/UpdateAnimalPhotos.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/animals/create',
    name: 'create-animal',
    component: () => import('../views/CreateAnimal.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/ads',
    name: 'ads',
    component: () => import('../views/Ads.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/ads/info',
    name: 'ads-info',
    component: () => import('../views/AdsInfo.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    redirect: '/admin/volunteers-requests',
    component: () => import('../views/AdminPanel.vue'),
    children: [
      {
        path: '/admin/volunteers-requests',
        meta: { authRequired: true },
        name: 'volunteers-requests',
        component: () => import('../views/VolunteersRequests.vue'),
      },
      {
        path: '/admin/register-fields-control',
        meta: { authRequired: true },
        name: 'register-fields-control',
        component: () => import('../views/RegisterFieldsControl.vue'),
      },
      {
        path: '/admin/notices',
        meta: { authRequired: true },
        name: 'notices',
        component: () => import('../views/NoticesControl.vue'),
      },
      {
        path: '/admin/platforms',
        meta: { authRequired: true },
        name: 'platforms',
        component: () => import('../views/Platforms.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

authRequired(router);

export default router;
