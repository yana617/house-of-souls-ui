import { createApp } from 'vue';
import { Switch } from 'ant-design-vue';

import App from './App.vue';
import router from './router';
import store from './store';

import logger from './utils/logger';

import 'ant-design-vue/dist/antd.css';

const run = () => {
  createApp(App)
    .use(store)
    .use(router)
    .use(Switch)
    .mount('#app');
};

if (process.env.VUE_APP_MSW === 'true') {
  Promise
    .all([import('msw'), import('@/mocks/handlers')])
    .then(([{ setupWorker }, { default: handlers }]) => setupWorker(...handlers))
    .then((worker) => worker.start())
    .then(() => {
      logger.log('Mock server successfully started');
      // reset IS_AUTH state
      fetch('https://api.house-of-souls.by/logout', { method: 'delete' });
    })
    .then(run)
    .catch(() => logger.error('Mock server start failed'));
} else {
  run();
}
