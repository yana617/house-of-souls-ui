import { createApp } from 'vue';
import { Switch } from 'ant-design-vue';

import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';

createApp(App)
  .use(store)
  .use(router)
  .use(Switch)
  .mount('#app');
