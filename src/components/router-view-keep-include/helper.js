import { defineComponent, h } from 'vue';
import RouterViewKeepInclude from './index.vue';

export function customRouterViewKeepIncludeWidthName(name) {
  return defineComponent({
    name,
    render: () => h(RouterViewKeepInclude),
  });
}
