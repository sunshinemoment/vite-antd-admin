import View from '@/view';
import pagesRoute from './pages';
import detailsRoute from './details';
import userRoute from './user';

const routes = [
  userRoute,
  {
    path: '/',
    component: View,
    children: [pagesRoute, detailsRoute],
  },
];

export default routes;
