import loadable from '@/utils/loadable';
import * as ConstantRouteName from '@/constants/route-name';

import UserLayout from '@/p-layout/user';

const route = {
  path: '/user',
  name: ConstantRouteName.USER,
  component: UserLayout,
  redirect: {
    name: ConstantRouteName.LOGIN,
  },
  children: [
    {
      path: 'login',
      name: ConstantRouteName.LOGIN,
      component: loadable(() => import(/* webpackChunkName: "user-login" */ '@/user/login')),
    },
    {
      path: 'register',
      name: ConstantRouteName.REGISTER,
      component: loadable(() => import(/* webpackChunkName: "user-register" */ '@/user/register')),
    },
  ],
};

export default route;
