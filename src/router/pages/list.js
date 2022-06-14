import loadable from '@/utils/loadable';
import RouterHolder from '@/components/router-holder';

const route = {
  path: 'list',
  component: RouterHolder,
  children: [
    {
      path: 'table-list',
      component: loadable(() =>
        import(/* webpackChunkName: "table-list" */ '@/pages/list/table-list'),
      ),
    },
    {
      path: 'target-list',
      component: RouterHolder,
      children: [
        {
          path: '',
          component: loadable(() =>
            import(/* webpackChunkName: "target-list" */ '@/pages/list/target-list'),
          ),
        },
        {
          path: 'add',
          component: loadable(() =>
            import(/* webpackChunkName: "target-list" */ '@/pages/list/target-list/add'),
          ),
        },
        {
          path: 'update/:id',
          component: loadable(() =>
            import(/* webpackChunkName: "target-list" */ '@/pages/list/target-list/add'),
          ),
        },
        {
          path: 'detail/:id',
          component: loadable(() =>
            import(/* webpackChunkName: "target-list" */ '@/pages/list/target-list/detail'),
          ),
        },
      ],
    },
  ],
};

export default route;
