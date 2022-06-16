import PageLayout from '@/layout/page';
import * as ConstantRouteName from '@/constants/route-name';

import pageListRoute from './list';

const route = {
  path: '',
  component: PageLayout,
  redirect: {
    name: ConstantRouteName.LIST,
  },
  children: [pageListRoute],
};

export default route;
