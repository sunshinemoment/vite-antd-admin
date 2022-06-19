import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  require('dotenv').config({ path: `./.env.${mode}` });
  const isDEV = command === 'serve';
  return {
    base: isDEV ? '/' : '/',
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // 路径别名
      },
      extensions: ['.js', '.json', '.ts', '.vue'], //
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
        scss: { additionalData: `@import '@/assets/styles/variable.scss';` },
      },
    },
    server: {
      open: true, // 服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      proxy: {
        '/api': {
          target: process.env.VITE_BASEURL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
