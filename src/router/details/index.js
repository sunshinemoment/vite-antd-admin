import DetailLayout from '@/layout/detail';

import detailUserRoute from './user';

const route = { path: 'detail', component: DetailLayout, children: [detailUserRoute] };

export default route;
