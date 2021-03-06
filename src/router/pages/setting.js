import loadable from '@/utils/loadable';
import * as ConstantRouteName from '@/constants/route-name';

const route = {
  path: 'setting',
  name: ConstantRouteName.SETTING,
  component: loadable(() => import(/* webpackChunkName: "setting" */ '@/pages/setting')),
};

export default route;
