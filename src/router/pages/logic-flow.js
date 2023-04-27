import loadable from '@/utils/loadable';
import * as ConstantRouteName from '@/constants/route-name';

const route = {
  path: 'logic-flow',
  name: ConstantRouteName.LOGIC_FLOW,
  component: loadable(() => import(/* webpackChunkName: "logic-flow" */ '@/pages/logic-flow')),
};

export default route;
