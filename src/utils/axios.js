/* eslint-disable no-param-reassign */
import axios from 'axios';

import { getToken, clearStorage } from './sessionStorage';
import router from '../router';
import store from '../store';
import notification from './notifications';

const checkResponseErrors = ({ success, error }) => {
  if (!success && error) {
    notification.error(error);
  }
};

const interceptorsSetup = () => {
  axios.interceptors.request.use((request) => {
    request.headers['x-access-token'] = getToken();
    return request;
  }, (error) => Promise.reject(error));

  axios.interceptors.response.use((response) => {
    checkResponseErrors(response.data);
    return response;
  }, (err) => {
    if (err.response.status === 401) {
      clearStorage();
      store.dispatch('users/clearUser');
      store.dispatch('permissions/resetPermissions');
      router.push('/');
    } else {
      checkResponseErrors(err.response.data);
    }
    return Promise.reject(err);
  });
};

export default interceptorsSetup;
