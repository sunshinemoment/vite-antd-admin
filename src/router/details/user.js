import loadable from '@/utils/loadable';

const route = {
  path: 'user',
  component: loadable(() => import(/* webpackChunkName: "detail-user" */ '@/details/user')),
};

export default route;
