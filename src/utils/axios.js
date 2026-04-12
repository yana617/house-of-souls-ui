import axios from 'axios';
import { getToken, clearStorage, setToken } from './sessionStorage';
import router from '../router';
import store from '../store';
import notification from './notifications';
import { AUTH_URL } from '@/api/constants';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const interceptorsSetup = () => {
  axios.defaults.withCredentials = true;

  axios.interceptors.request.use(
    async (request) => {
      if (isRefreshing && request.url !== `${AUTH_URL}/refresh`) {
        return new Promise((resolve) => {
          failedQueue.push({
            resolve: (token) => {
              request.headers['x-access-token'] = token;
              resolve(request);
            },
            reject: () => resolve(request), // fallback
          });
        });
      }

      request.headers['x-access-token'] = getToken();
      return request;
    },
    (error) => Promise.reject(error),
  );

  axios.interceptors.response.use(
    (response) => {
      const { success, error } = response.data || {};
      if (!success && error) notification.error(error);
      return response;
    },

    async (error) => {
      const originalRequest = error.config;

      if (originalRequest.url === `${AUTH_URL}/refresh` || !getToken()) {
        clearStorage();
        store.dispatch('users/clearUser');
        store.dispatch('permissions/resetPermissions');
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers['x-access-token'] = token;
              return axios(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {
          const res = await axios.post(`${AUTH_URL}/refresh`);

          const { accessToken } = res.data.data;
          setToken(accessToken);

          processQueue(null, accessToken);

          originalRequest.headers['x-access-token'] = accessToken;

          return axios(originalRequest);
        } catch (err) {
          processQueue(err, null);
          clearStorage();
          store.dispatch('users/clearUser');
          store.dispatch('permissions/resetPermissions');
          router.push('/');
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      const { success, error: errMsg } = error.response?.data || {};
      if (!success && errMsg) notification.error(errMsg);

      return Promise.reject(error);
    },
  );
};

export default interceptorsSetup;
