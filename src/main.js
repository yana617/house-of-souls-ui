/* eslint-disable import/no-extraneous-dependencies */
import { createApp } from 'vue';
import {
  Switch,
  Table,
  Tag,
  Spin,
  Tabs,
  DatePicker,
  TimePicker,
  Checkbox,
  Input,
  Layout,
  LayoutContent,
  LayoutFooter,
  Typography,
  Select,
  Modal,
  Divider,
} from 'ant-design-vue';
import { io } from 'socket.io-client';
import { createVueMatchMediaPlugin } from '@cwist/vue-match-media';
import InlineSvg from 'vue-inline-svg';
import 'ant-design-vue/dist/antd.css';

import App from './App.vue';
import router from './router';
import store from './store';
import logger from './utils/logger';
import interceptorsSetup from './utils/axios';

const breakpoints = {
  mobile: { maxWidth: 768 },
};
const VueMatchMediaPlugin = createVueMatchMediaPlugin({ breakpoints });
interceptorsSetup();

const { VUE_APP_HOS_SERVICE } = process.env;
const socket = io(VUE_APP_HOS_SERVICE, {
  cors: {
    origin: VUE_APP_HOS_SERVICE,
    methods: ['GET', 'POST'],
  },
});

const run = () => {
  const app = createApp(App)
    .use(store)
    .use(router)
    .use(Switch)
    .use(Spin)
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
    .use(Typography)
    .use(Select)
    .use(Modal)
    .use(Divider)
    .use(VueMatchMediaPlugin);

  app.config.globalProperties.$socket = socket;

  app.component('inline-svg', InlineSvg);

  app.mount('#app');
};

if (process.env.VUE_APP_MSW === 'true') {
  Promise
    .all([import('msw'), import('@/mocks/handlers')])
    .then(([{ setupWorker }, { default: handlers }]) => setupWorker(...handlers))
    .then((worker) => worker.start())
    .then(() => {
      logger.log('Mock server successfully started');
    })
    .then(run)
    .catch(() => logger.error('Mock server start failed'));
} else {
  run();
}
