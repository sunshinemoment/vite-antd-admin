import 'vue-global-api';
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import pApp from './p-app';
import mApp from './m-app';
import pRouter from './p-router';
import mRouter from './m-router';
import { isMobile } from '@/utils/tools';
import './antd.less';
import './global.scss';

if (isMobile()) {
  const app = createApp(mApp);
  app.use(Antd).use(mRouter).mount('#app');
} else {
  const app = createApp(pApp);
  app.use(Antd).use(pRouter).mount('#app');
}
