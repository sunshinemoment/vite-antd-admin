import View from '@/view';

import userRoute from './user';
import pagesRoute from './pages';

const routes = [
  userRoute,
  {
    path: '/',
    component: View,
    children: [pagesRoute],
  },
];

export default routes;
