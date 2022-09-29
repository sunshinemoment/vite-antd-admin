import loadable from '@/utils/loadable';
import RouterHolder from '@/components/router-holder';
import * as ConstantRouteName from '@/constants/route-name';

const route = {
  path: 'list',
  component: RouterHolder,
  name: ConstantRouteName.LIST,
  redirect: {
    name: ConstantRouteName.TABLE_LIST,
  },
  children: [
    {
      path: 'table-list',
      name: ConstantRouteName.TABLE_LIST,
      component: loadable(() =>
        import(/* webpackChunkName: "table-list" */ '@/m-pages/list/table-list'),
      ),
    },
    {
      path: 'target-list',
      component: RouterHolder,
      name: ConstantRouteName.TARGET_LIST,
      redirect: {
        name: ConstantRouteName.TARGET_LIST_LIST,
      },
      children: [
        {
          path: '',
          name: ConstantRouteName.TARGET_LIST_LIST,
          component: loadable(() =>
            import(/* webpackChunkName: "target-list" */ '@/m-pages/list/target-list'),
          ),
        },
        {
          path: 'add',
          name: ConstantRouteName.TARGET_LIST_ADD,
          component: loadable(() =>
            import(/* webpackChunkName: "target-list" */ '@/m-pages/list/target-list/add'),
          ),
        },
        {
          path: 'update/:id',
          name: ConstantRouteName.TARGET_LIST_UPDATE,
          component: loadable(() =>
            import(/* webpackChunkName: "target-list" */ '@/m-pages/list/target-list/add'),
          ),
        },
        {
          path: 'detail/:id',
          name: ConstantRouteName.TARGET_LIST_DETAIL,
          component: loadable(() =>
            import(/* webpackChunkName: "target-list" */ '@/m-pages/list/target-list/detail'),
          ),
        },
      ],
    },
  ],
};

export default route;
