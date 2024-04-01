import loadable from '@/utils/loadable';
import { customRouterViewKeepIncludeWidthName } from '@/components/router-view-keep-include/helper';
import { customRouterViewKeepDynamicWidthName } from '@/components/router-view-keep-dynamic/helper';
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
        keepAlive: true,
      },
      children: [
        {
          /** 静态态路由使用缓存示例 */
          path: '',
          name: ConstantRouteName.TARGET_LIST_LIST,
          component: customRouteWidthName(ConstantRouteName.TARGET_LIST_LIST, () =>
            import(/* webpackChunkName: "target-list" */ '@/pages/list/target-list'),
          ),
          meta: {
            keepAlive: true,
          },
        },
        {
          /** 静态态路由使用缓存示例 */
          path: 'add',
          name: ConstantRouteName.TARGET_LIST_ADD,
          component: customRouteWidthName(ConstantRouteName.TARGET_LIST_ADD, () =>
            import(/* webpackChunkName: "target-list" */ '@/pages/list/target-list/add'),
          ),
          meta: {
            keepAlive: true,
          },
        },
        {
          /** 动态路由不使用缓存示例 */
          path: 'update/:id',
          name: ConstantRouteName.TARGET_LIST_UPDATE,
          component: loadable(() =>
            import(/* webpackChunkName: "target-list" */ '@/pages/list/target-list/add'),
          ),
        },
        {
          /** 动态路由使用缓存示例 */
          path: 'detail',
          name: ConstantRouteName.TARGET_LIST_DETAIL,
          component: customRouterViewKeepDynamicWidthName(ConstantRouteName.TARGET_LIST_DETAIL),
          meta: {
            keepAlive: true,
          },
          children: [
            {
              path: ':id',
              component: loadable(() =>
                import(/* webpackChunkName: "target-list" */ '@/pages/list/target-list/detail'),
              ),
              meta: {
                keepAlive: true,
              },
            },
          ],
        },
      ],
    },
  ],
};

export default route;
