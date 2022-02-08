export const HEADER_LINKS = [{
  url: '/volunteers',
  label: 'Волонтеры',
  slug: 'volunteers',
  permissions: ['VIEW_USERS'],
}, {
  url: '/',
  label: 'График',
  slug: 'schedule',
}, {
  url: '/profile',
  label: 'Профиль',
  slug: 'profile',
  permissions: ['VIEW_PROFILE'],
}, {
  url: '/rating',
  label: 'Рейтинг',
  slug: 'rating',
  permissions: ['VIEW_RATING'],
}];

export const ADMIN_LINKS = [{
  url: '/admin/volunteers-requests',
  label: 'Запросы на волонтерство',
  slug: 'volunteers-requests',
  permissions: ['EDIT_PERMISSIONS'],
}, {
  url: '/admin/register-fields-control',
  label: 'Поля регистрации',
  slug: 'register-fields-control',
  permissions: ['CREATE_ADDITIONAL_FIELD_TEMPLATE', 'EDIT_ADDITIONAL_FIELD_TEMPLATE',
    'DELETE_ADDITIONAL_FIELD_TEMPLATE'],
}, {
  url: '/admin/notices',
  label: 'Информационные блоки',
  slug: 'notices',
  permissions: ['CREATE_NOTICE', 'EDIT_NOTICE', 'DELETE_NOTICE'],
}];

export const PATHS = {
  '/': 'schedule',
  '/volunteers': 'volunteers',
  '/profile': 'profile',
  '/rating': 'rating',
  '/admin': 'admin',
  '/admin/register-fields-control': 'register-fields-control',
  '/admin/volunteers-requests': 'volunteers-requests',
  '/admin/notices': 'notices',
};
