import PageLayout from '@/layout/page';
import * as ConstantRouteName from '@/constants/route-name';

import listRoute from './list';
import logicFlowRoute from './logic-flow';
import settingRoute from './setting';

const route = {
  path: '',
  component: PageLayout,
  redirect: {
    name: ConstantRouteName.LIST,
  },
  children: [listRoute, logicFlowRoute, settingRoute],
};

export default route;
