import { defineAsyncComponent, h } from 'vue';
// import ErrorPage from '@/components/error-page/index.vue';
import LoadPage from '@/components/load-page/index.vue';
import { sessionStore } from '@/utils/store';

const refreshKey = 'refresh';

export default (asyncComponent) => {
  const AsyncComp = defineAsyncComponent({
    loader: asyncComponent,
    delay: 200,
    timeout: 10000,
    loadingComponent: LoadPage,
    errorComponent: LoadPage,
    onError(error, retry, fail, attempts) {
      if (error.message.match(/fetch/) && attempts <= 3) {
        // 请求发生错误时重试，最多可尝试 3 次
        retry();
        return;
      }
      const refreshCount = sessionStore.get(refreshKey) || 1;
      if (refreshCount <= 3) {
        sessionStore.set(refreshKey, refreshCount + 1);
        location.reload();
        return;
      }
      // 注意，retry/fail 就像 promise 的 resolve/reject 一样：
      // 必须调用其中一个才能继续错误处理。
      sessionStore.set(refreshKey, undefined);
      fail();
    },
  });
  return {
    render() {
      return h(AsyncComp);
    },
  };
};
