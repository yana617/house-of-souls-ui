export const HEADER_LINKS = [{
  url: '/volunteers',
  label: 'Волонтеры',
  slug: 'volunteers',
}, {
  url: '/',
  label: 'График',
  slug: 'schedule',
}, {
  url: '/profile',
  label: 'Профиль',
  slug: 'profile',
}];

export const ADMIN_LINKS = [{
  url: '/admin/volunteers-requests',
  label: 'Запросы на волонтерство',
  slug: 'volunteers-requests',
}, {
  url: '/admin/register-fields-control',
  label: 'Поля регистрации',
  slug: 'register-fields-control',
}, {
  url: '/admin/notices-control',
  label: 'Информационные блоки',
  slug: 'notices-control',
}];

export const PATHS = {
  '/': 'schedule',
  '/volunteers': 'volunteers',
  '/profile': 'profile',
  '/admin': 'admin',
  '/admin/register-fields-control': 'register-fields-control',
  '/admin/volunteers-requests': 'volunteers-requests',
  '/admin/notices-control': 'notices-control',
};
