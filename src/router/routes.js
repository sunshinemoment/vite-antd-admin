import View from '@/view';
import * as ConstantRouteName from '@/constants/route-name';

import userRoute from './user';
import pagesRoute from './pages';
import userDetailRoute from './details/user';

const routes = [
  userRoute,
  {
    path: '/',
    component: View,
    name: ConstantRouteName.VIEW,
    children: [pagesRoute, userDetailRoute],
  },
];

export default routes;
