import { createApp } from 'vue';
import { Switch } from 'ant-design-vue';

// eslint-disable-next-line import/no-extraneous-dependencies
import { setupWorker } from 'msw';
import handlers from '@/mocks/handlers';
import App from './App.vue';
import router from './router';
import store from './store';

import 'ant-design-vue/dist/antd.css';

if (process.env.VUE_APP_MSW === 'true') {
  const worker = setupWorker(...handlers);
  worker.start()
    .then(() => {
      console.log('Mock server successfully started');
      // reset IS_AUTH state
      fetch('https://api.house-of-souls.by/logout', { method: 'delete' });
    })
    .catch(() => console.error('Mock server start failed'));
}

createApp(App)
  .use(store)
  .use(router)
  .use(Switch)
  .mount('#app');
