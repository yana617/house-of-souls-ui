import { createApp } from 'vue';
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
  tablet: { maxWidth: 767 },
  mobile: { maxWidth: 600 },
};
const VueMatchMediaPlugin = createVueMatchMediaPlugin({ breakpoints });
interceptorsSetup();

const { VITE_HOS_SERVICE } = import.meta.env;
const socket = io(VITE_HOS_SERVICE, {
  cors: {
    origin: VITE_HOS_SERVICE,
    methods: ['GET', 'POST'],
  },
});

const run = () => {
  const app = createApp(App)
    .use(store)
    .use(router)
    .use(VueMatchMediaPlugin);

  app.config.globalProperties.$socket = socket;

  app.component('InlineSvg', InlineSvg);

  app.directive('permission', {
    mounted(el, binding) {
      const { value } = binding;
      const permissions = store.state.permissions.my;
      
      if (!permissions?.includes(value)) {
        el.remove();
      }
    }
  });

  app.mount('#app');
};

if (import.meta.env.VITE_MSW === 'true') {
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
