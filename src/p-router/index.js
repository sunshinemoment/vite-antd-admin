import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { localStore } from '@/utils/store';

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach((to, _, next) => {
  const token = localStore.get('token');

  if (to.path.startsWith('/user')) {
    if (token) {
      next('/');
      return;
    }
    next();
    return;
  }
  if (!token) {
    next('/user/login');
  }
  next();
});

export default router;
