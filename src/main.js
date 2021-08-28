/* eslint-disable import/no-extraneous-dependencies */
import { createApp } from 'vue';
import {
  Switch,
  Table,
  Tag,
  Tabs,
  DatePicker,
  TimePicker,
  Checkbox,
  Input,
  Layout,
  LayoutContent,
  LayoutFooter,
} from 'ant-design-vue';
import { createVueMatchMediaPlugin } from '@cwist/vue-match-media';
import { io } from 'socket.io-client';

import App from './App.vue';
import router from './router';
import store from './store';

import logger from './utils/logger';

import 'ant-design-vue/dist/antd.css';

const breakpoints = {
  mobile: { maxWidth: 768 },
};
const VueMatchMediaPlugin = createVueMatchMediaPlugin({ breakpoints });

const socket = io('http://localhost:1082', {
  cors: {
    origin: 'http://localhost:1082',
    methods: ['GET', 'POST'],
  },
});

const run = () => {
  const app = createApp(App)
    .use(store)
    .use(router)
    .use(Switch)
    .use(Tabs)
    .use(DatePicker)
    .use(TimePicker)
    .use(Checkbox)
    .use(Table)
    .use(Tag)
    .use(Input)
    .use(Layout)
    .use(LayoutContent)
    .use(LayoutFooter)
    .use(VueMatchMediaPlugin);

  app.config.globalProperties.$socket = socket;
  app.mount('#app');
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
