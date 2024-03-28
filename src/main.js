import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import './antd.less';
import './global.scss';

const app = createApp(App);

app.use(Antd).use(router).mount('#app');
