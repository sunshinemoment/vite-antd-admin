import View from '@/view';

import userRoute from './user';
import pagesRoute from './pages';
import userDetailRoute from './details/user';

const routes = [
  userRoute,
  {
    path: '/',
    component: View,
    children: [pagesRoute, userDetailRoute],
  },
];

export default routes;
