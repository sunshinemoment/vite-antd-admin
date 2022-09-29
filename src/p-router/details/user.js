import loadable from '@/utils/loadable';

import * as ConstantRouteName from '@/constants/route-name';

const route = {
  path: 'user-detail/:id',
  name: ConstantRouteName.DETAIL_USER,
  component: loadable(() => import(/* webpackChunkName: "user-detail" */ '@/details/user')),
};

export default route;
