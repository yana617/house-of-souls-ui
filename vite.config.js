import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'antd-core': ['ant-design-vue/es/button', 'ant-design-vue/es/input'],
          'antd-data': ['ant-design-vue/es/table', 'ant-design-vue/es/select'],
          'antd-overlay': ['ant-design-vue/es/modal'],
        },
      },
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('swiper-'),
        },
      },
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: true,
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
  },
  test: {
    environment: 'jsdom',
  },
});
