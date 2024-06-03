import * as ConstantRouteName from '@/constants/route-name';
import customRouteWidthName from '@/utils/customRouteWidthName';

const route = {
  path: 'logic-flow',
  name: ConstantRouteName.LOGIC_FLOW,
  component: customRouteWidthName(ConstantRouteName.LOGIC_FLOW, () =>
    import(/* webpackChunkName: "logic-flow" */ '@/pages/logic-flow'),
  ),
  meta: {
    keepAlive: true,
  },
};

export default route;
