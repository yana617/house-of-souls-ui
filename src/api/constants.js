const {
  VITE_AUTH_SERVICE: AUTH_SERVICE_API,
  VITE_HOS_SERVICE: HOS_SERVICE_API,
  VITE_LIMIT,
} = import.meta.env;

export const LIMIT = parseInt(VITE_LIMIT, 10);

export const AFT_URL = `${AUTH_SERVICE_API}/additional-field-templates`;
export const UAF_URL = `${AUTH_SERVICE_API}/user-additional-fields`;
export const AUTH_URL = `${AUTH_SERVICE_API}/auth`;
export const AUTH_USERS_URL = `${AUTH_SERVICE_API}/users`;
export const PERMISSIONS_URL = `${AUTH_SERVICE_API}/permissions`;
export const ROLES_URL = `${AUTH_SERVICE_API}/roles`;

export const CLAIMS_URL = `${HOS_SERVICE_API}/claims`;
export const HOS_USERS_URL = `${HOS_SERVICE_API}/users`;
export const NOTICES_URL = `${HOS_SERVICE_API}/notices`;
export const HISTORY_ACTIONS_URL = `${HOS_SERVICE_API}/history-actions`;
