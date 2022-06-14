import PageLayout from '@/layout/page';

import pageListRoute from './list';

const route = { path: '', component: PageLayout, children: [pageListRoute] };

export default route;
