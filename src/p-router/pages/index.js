import PageLayout from '@/p-layout/page';
import * as ConstantRouteName from '@/constants/route-name';

import listRoute from './list';
import settingRoute from './setting';

const route = {
  path: '',
  component: PageLayout,
  redirect: {
    name: ConstantRouteName.LIST,
  },
  children: [listRoute, settingRoute],
};

export default route;
