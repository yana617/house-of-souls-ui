import { createApp } from 'vue';
import {
  Switch,
  Table,
  Tag,
  Tabs,
  DatePicker,
} from 'ant-design-vue';
import { createVueMatchMediaPlugin } from '@cwist/vue-match-media';

import App from './App.vue';
import router from './router';
import store from './store';

import logger from './utils/logger';

import 'ant-design-vue/dist/antd.css';

const breakpoints = {
  mobile: { maxWidth: 768 },
};
const VueMatchMediaPlugin = createVueMatchMediaPlugin({ breakpoints });

const run = () => {
  createApp(App)
    .use(store)
    .use(router)
    .use(Switch)
    .use(Tabs)
    .use(DatePicker)
    .use(Table)
    .use(Tag)
    .use(VueMatchMediaPlugin)
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
