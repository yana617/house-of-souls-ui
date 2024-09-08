import axios from 'axios';

import { getToken, clearStorage } from './sessionStorage';
import router from '../router';
import store from '../store';
import notification from './notifications';

const UNAUTHORIZED_STATUS = 401;

const checkResponseErrors = ({ success, error }) => {
  if (!success && error) {
    notification.error(error);
  }
};

const checkResponseStatus = (status) => {
  if (status === UNAUTHORIZED_STATUS) {
    clearStorage();
    store.dispatch('users/clearUser');
    store.dispatch('permissions/resetPermissions');
    router.push('/');
  }
};

const interceptorsSetup = () => {
  axios.interceptors.request.use((request) => {
    request.headers['x-access-token'] = getToken();
    return request;
  }, (error) => Promise.reject(error));

  axios.interceptors.response.use((response) => {
    checkResponseErrors(response.data || {});
    return response;
  }, (err) => {
    checkResponseStatus(err.response.status);
    if (err.response.status === UNAUTHORIZED_STATUS) {
      return Promise.reject(err);
    }

    checkResponseErrors(err.response.data || {});
    return Promise.reject(err);
  });
};

export default interceptorsSetup;
