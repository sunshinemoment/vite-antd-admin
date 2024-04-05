import * as ConstantRouteName from '@/constants/route-name';
import customRouteWidthName from '@/utils/customRouteWidthName';

const route = {
  path: 'setting',
  name: ConstantRouteName.SETTING,
  component: customRouteWidthName(ConstantRouteName.SETTING, () =>
    import(/* webpackChunkName: "setting" */ '@/pages/setting'),
  ),
};

export default route;
