import loadable from '@/utils/loadable';
import { customRouterViewKeepIncludeWidthName } from '@/components/router-view-keep-include/helper';
import { customRouterViewKeepDynamicWidthName } from '@/components/router-view-keep-dynamic/helper';
import * as ConstantRouteName from '@/constants/route-name';
import customRouteWidthName from '@/utils/customRouteWidthName';

const route = {
  path: 'list-v2',
  component: customRouterViewKeepIncludeWidthName(ConstantRouteName.LIST_V2),
  name: ConstantRouteName.LIST_V2,
  redirect: {
    name: ConstantRouteName.TABLE_LIST_V2,
  },
  meta: {
    keepAlive: true,
  },
  children: [
    {
      path: 'table-list-v2',
      name: ConstantRouteName.TABLE_LIST_V2,
      component: customRouteWidthName(ConstantRouteName.TABLE_LIST_V2, () =>
        import(/* webpackChunkName: "table-list-v2" */ '@/pages/list2/table-list'),
      ),
      meta: {
        keepAlive: true,
      },
    },
    {
      path: 'target-list-v2',
      component: customRouterViewKeepIncludeWidthName(ConstantRouteName.TARGET_LIST_V2),
      name: ConstantRouteName.TARGET_LIST_V2,
      redirect: {
        name: ConstantRouteName.TARGET_LIST_LIST_V2,
      },
      meta: {
        keepAlive: true,
      },
      children: [
        {
          /** 静态态路由使用缓存示例 */
          path: '',
          name: ConstantRouteName.TARGET_LIST_LIST_V2,
          component: customRouteWidthName(ConstantRouteName.TARGET_LIST_LIST_V2, () =>
            import(/* webpackChunkName: "target-list-v2" */ '@/pages/list2/target-list'),
          ),
          meta: {
            keepAlive: true,
          },
        },
        {
          /** 静态态路由使用缓存示例 */
          path: 'add',
          name: ConstantRouteName.TARGET_LIST_ADD_V2,
          component: customRouteWidthName(ConstantRouteName.TARGET_LIST_ADD_V2, () =>
            import(/* webpackChunkName: "target-list" */ '@/pages/list2/target-list/add'),
          ),
          meta: {
            keepAlive: true,
          },
        },
        {
          /** 动态路由不使用缓存示例 */
          path: 'update/:id',
          name: ConstantRouteName.TARGET_LIST_UPDATE_V2,
          component: loadable(() =>
            import(/* webpackChunkName: "target-list" */ '@/pages/list2/target-list/add'),
          ),
        },
        {
          /** 动态路由使用缓存示例 */
          path: 'detail',
          name: ConstantRouteName.TARGET_LIST_DETAIL,
          component: customRouterViewKeepDynamicWidthName(ConstantRouteName.TARGET_LIST_DETAIL_V2),
          meta: {
            keepAlive: true,
          },
          children: [
            {
              path: ':id',
              component: loadable(() =>
                import(/* webpackChunkName: "target-list" */ '@/pages/list2/target-list/detail'),
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
