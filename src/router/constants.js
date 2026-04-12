export const DESKTOP_MENU_ITEMS = [
  { label: 'Волонтеры', to: '/volunteers', permission: 'VIEW_USERS' },
  { label: 'Животные', to: '/', permission: null },
  { label: 'График', to: '/schedule', permission: 'VIEW_PROFILE' },
  { label: 'Реклама', to: '/ads', permission: 'VIEW_PROFILE' },
  { label: 'Как помочь', to: '/how-to-help', invert: 'VIEW_PROFILE' },
  {
    label: 'Остальное',
    to: '/analytics',
    permission: 'VIEW_RATING',
    match: (path) => path.startsWith('/analytics'),
  },
];

export const ADMIN_LINKS = [
  {
    url: '/admin/volunteers-requests',
    label: 'Запросы на волонтерство',
    slug: 'volunteers-requests',
    permissions: ['EDIT_PERMISSIONS'],
  },
  {
    url: '/admin/register-fields-control',
    label: 'Поля регистрации',
    slug: 'register-fields-control',
    permissions: [
      'CREATE_ADDITIONAL_FIELD_TEMPLATE',
      'EDIT_ADDITIONAL_FIELD_TEMPLATE',
      'DELETE_ADDITIONAL_FIELD_TEMPLATE',
    ],
  },
  {
    url: '/admin/notices',
    label: 'Информационные блоки',
    slug: 'notices',
    permissions: ['CREATE_NOTICE', 'EDIT_NOTICE', 'DELETE_NOTICE'],
  },
  {
    url: '/admin/platforms',
    label: 'Платформы для рекламы',
    slug: 'platforms',
    permissions: ['MANAGE_PLATFORMS'],
  },
];

export const MOBILE_MENU_ITEMS = [
  {
    url: '/volunteers',
    label: 'Волонтеры',
    slug: 'volunteers',
    permissions: ['VIEW_USERS'],
  },
  {
    url: '/',
    label: 'Животные',
    slug: 'animals',
  },
  {
    url: '/schedule',
    label: 'График',
    slug: 'schedule',
    permissions: ['VIEW_USERS'],
  },
  {
    url: '/ads',
    label: 'Реклама',
    slug: 'ads',
    permissions: ['VIEW_PROFILE'],
    withDivider: true,
  },
  {
    url: '/map',
    label: 'Карта',
    slug: 'map',
    permissions: ['VIEW_ANIMALS'],
  },
  {
    url: '/analytics/rating',
    label: 'Рейтинг',
    slug: 'rating',
    permissions: ['VIEW_RATING'],
  },
  {
    url: '/analytics/stats',
    label: 'Статистика',
    slug: 'stats',
    permissions: ['VIEW_RATING'],
  },
  {
    url: '/how-to-help',
    label: 'Как помочь',
    slug: 'how-to-help',
    withDivider: true,
  },
  ...ADMIN_LINKS,
];

export const PATHS = {
  '/schedule': 'schedule',
  '/volunteers': 'volunteers',
  '/map': 'map',
  '/profile': 'profile',
  '/analytics/rating': 'rating',
  '/analytics/stats': 'stats',
  '/admin': 'admin',
  '/admin/register-fields-control': 'register-fields-control',
  '/admin/volunteers-requests': 'volunteers-requests',
  '/admin/notices': 'notices',
  '/admin/platforms': 'platforms',
  '/animals': 'animals',
  '/how-to-help': 'how-to-help',
  '/': 'animals',
};
