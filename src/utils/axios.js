/* eslint-disable no-param-reassign */
import axios from 'axios';

import { getToken } from './sessionStorage';

const instance = axios.create();

instance.interceptors.request.use((request) => {
  request.headers['x-access-token'] = getToken();
  return request;
}, (error) => Promise.reject(error));

export default instance;
