import loadable from '@/utils/loadable';
import { customRouterViewKeepIncludeWidthName } from '@/components/router-view-keep-include/helper';
import routerViewKeepDynamic from '@/components/router-view-keep-dynamic';
import * as ConstantRouteName from '@/constants/route-name';
import customRouteWidthName from '@/utils/customRouteWidthName';

const route = {
  path: 'list',
  component: customRouterViewKeepIncludeWidthName(ConstantRouteName.LIST),
  name: ConstantRouteName.LIST,
  redirect: {
    name: ConstantRouteName.TABLE_LIST,
  },
  meta: {
    keepAlive: true,
  },
  children: [
    {
      path: 'table-list',
      name: ConstantRouteName.TABLE_LIST,
      component: customRouteWidthName(ConstantRouteName.TABLE_LIST, () =>
        import(/* webpackChunkName: "table-list" */ '@/pages/list/table-list'),
      ),
      meta: {
        keepAlive: true,
      },
    },
    {
      path: 'target-list',
      component: customRouterViewKeepIncludeWidthName(ConstantRouteName.TARGET_LIST),
      name: ConstantRouteName.TARGET_LIST,
      redirect: {
        name: ConstantRouteName.TARGET_LIST_LIST,
      },
      meta: {
        keepAlive: false,
      },
      children: [
        {
          path: '',
          name: ConstantRouteName.TARGET_LIST_LIST,
          component: customRouteWidthName(ConstantRouteName.TARGET_LIST_LIST, () =>
            import(/* webpackChunkName: "target-list" */ '@/pages/list/target-list'),
          ),
        },
        {
          path: 'add',
          name: ConstantRouteName.TARGET_LIST_ADD,
          component: customRouteWidthName(ConstantRouteName.TARGET_LIST_ADD, () =>
            import(/* webpackChunkName: "target-list" */ '@/pages/list/target-list/add'),
          ),
        },
        {
          path: 'update/:id',
          name: ConstantRouteName.TARGET_LIST_UPDATE,
          component: customRouteWidthName(ConstantRouteName.TARGET_LIST_UPDATE, () =>
            import(/* webpackChunkName: "target-list" */ '@/pages/list/target-list/add'),
          ),
        },
        {
          path: 'detail',
          name: ConstantRouteName.TARGET_LIST_DETAIL,
          component: routerViewKeepDynamic,
          children: [
            {
              path: ':id',
              component: loadable(() =>
                import(/* webpackChunkName: "target-list" */ '@/pages/list/target-list/detail'),
              ),
            },
          ],
        },
      ],
    },
  ],
};

export default route;
