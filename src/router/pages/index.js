import PageLayout from '@/layout/page';
import * as ConstantRouteName from '@/constants/route-name';

import listRoute from './list';
import listV2Route from './list-v2';
import logicFlowRoute from './logic-flow';
import settingRoute from './setting';

const route = {
  path: '',
  component: PageLayout,
  redirect: {
    name: ConstantRouteName.LIST,
  },
  children: [listRoute, listV2Route, logicFlowRoute, settingRoute],
};

export default route;
