import axios from 'axios';
import { getToken, clearStorage, setToken } from './sessionStorage';
import router from '../router';
import store from '../store';
import notification from './notifications';
import { AUTH_URL, AUTH_USERS_URL } from '@/api/constants';
import logger from './utils/logger';

const REFRESH_URL = `${AUTH_URL}/refresh`;
const ME_URL = `${AUTH_USERS_URL}/me`;

// Singleton-промис refresh-запроса. Пока он не null — все новые запросы
// ждут его разрешения (кроме самого refresh).
let refreshPromise = null;

// Singleton-промис первичной инициализации авторизации:
// /me (+ возможный /refresh + ретрай /me). Пока он не зарезолвлен — ВСЕ
// остальные запросы ждут его, чтобы стартовать уже с актуальным токеном
// и не получить «гостевые» данные на эндпоинтах, которые отдают 200 и
// для неавторизованных, и для авторизованных пользователей (например /notices).
let authBootstrapPromise = null;

// Регистрируется снаружи (App.vue / main.js). Принимает промис, который
// резолвится, когда /me окончательно отработал (включая /refresh-ретрай).
// Возвращает текущий промис, чтобы вызовы были идемпотентны.
export const setAuthBootstrap = (promise) => {
  if (authBootstrapPromise) return authBootstrapPromise;
  // Глотаем ошибку: даже если /me/refresh упали — гейт должен открыться,
  // иначе UI зависнет. Ошибки уже обработаны response-интерцептором.
  authBootstrapPromise = Promise.resolve(promise).catch(() => {});
  return authBootstrapPromise;
};

const isRefreshRequest = (url) => typeof url === 'string' && url.includes(REFRESH_URL);

// Запросы, которые не должны ждать auth-bootstrap (иначе будет дедлок или
// бессмысленная задержка): сам /me, /refresh и публичные auth-эндпоинты.
const isAuthBootstrapBypass = (url) => {
  if (typeof url !== 'string') return false;
  if (url.includes(REFRESH_URL)) return true;
  if (url.includes(ME_URL)) return true;
  // login/register/forgot-password/reset-password — пользовательские
  // действия, которые сами по себе и являются точкой авторизации.
  if (url.startsWith(AUTH_URL) || url.includes(`${AUTH_URL}/`)) return true;
  return false;
};

const performRefresh = () => {
  if (refreshPromise) return refreshPromise;

  logger.log(`[REFRESH] Started at ${new Date().toISOString()}`);
  const startTime = Date.now();

  refreshPromise = axios
    .post(REFRESH_URL)
    .then((res) => {
      const duration = Date.now() - startTime;
      logger.log(`[REFRESH] Completed in ${duration}ms`);

      const accessToken = res?.data?.data?.accessToken;
      if (!accessToken) {
        throw new Error('Refresh response did not include accessToken');
      }
      setToken(accessToken);
      return accessToken;
    })
    .finally(() => {
      // освобождаем слот после микротика, чтобы ожидающие запросы уже
      // подхватили новый токен через резолв промиса.
      refreshPromise = null;
    });

  return refreshPromise;
};

const handleAuthFailure = () => {
  clearStorage();
  store.dispatch('users/clearUser');
  store.dispatch('permissions/resetPermissions');
};

const interceptorsSetup = () => {
  axios.defaults.withCredentials = true;

  axios.interceptors.request.use(
    async (request) => {
      // сам refresh-запрос не должен ждать сам себя и не должен нести
      // просроченный access-токен в заголовке.
      if (isRefreshRequest(request.url)) {
        delete request.headers['x-access-token'];
        return request;
      }

      // Гейт первичной инициализации авторизации.
      // Все запросы (кроме самого /me, /refresh и публичных auth-эндпоинтов)
      // ждут, пока /me окончательно отработает — иначе они уйдут без токена
      // и могут получить «гостевые» 200-ответы вместо авторизованных данных.
      if (authBootstrapPromise && !isAuthBootstrapBypass(request.url)) {
        try {
          await authBootstrapPromise;
        } catch {
          // см. комментарий выше — гейт всегда открывается.
        }
      }

      // Если refresh в процессе — ждём его и используем новый токен.
      // Это защищает от параллельной волны 401 и лишних повторов.
      if (refreshPromise) {
        try {
          const token = await refreshPromise;
          if (token) request.headers['x-access-token'] = token;
        } catch {
          // refresh провалился — отправляем запрос без токена,
          // а response-интерцептор отработает его 401 штатно.
        }
        return request;
      }

      const token = getToken();
      if (token) {
        request.headers['x-access-token'] = token;
      } else {
        delete request.headers['x-access-token'];
      }
      return request;
    },
    (error) => Promise.reject(error),
  );

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config || {};
      const status = error.response?.status;

      // Все не-401 ошибки — нотифицируем и корректно реджектим,
      // чтобы .catch() в api-модулях отработал семантически правильно.
      if (status !== 401) {
        const { success, error: errMsg } = error.response?.data || {};
        if (!success && errMsg) notification.error(errMsg);
        return Promise.reject(error);
      }

      // 401 на самом refresh-запросе или на ретрае — финал: разлогин.
      if (isRefreshRequest(originalRequest.url) || originalRequest._retry) {
        handleAuthFailure();
        return Promise.reject(error);
      }

      // Нет токена и нет признаков сессии (localStorage пуст) — пробовать
      // refresh всё равно можно: браузер сам подцепит refresh-cookie, если
      // она есть. Если cookie нет — refresh отдаст 401 и мы чисто отработаем.
      originalRequest._retry = true;

      try {
        const token = await performRefresh();
        if (token) {
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers['x-access-token'] = token;
        }
        return axios(originalRequest);
      } catch (err) {
        handleAuthFailure();
        // Редиректим на главную только если текущий маршрут требовал авторизации.
        const currentRoute = router.currentRoute?.value;
        if (currentRoute?.meta?.authRequired) {
          router.push('/');
        }
        return Promise.reject(err);
      }
    },
  );
};

export default interceptorsSetup;
