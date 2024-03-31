import { defineComponent, h } from 'vue';
import Component from './index.vue';

export function customRouterViewKeepDynamicWidthName(name) {
  return defineComponent({
    name,
    render: () => h(Component),
  });
}
