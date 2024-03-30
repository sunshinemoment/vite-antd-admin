<script setup>
import { createVNode } from 'vue';
import useRouteCache from '@/hooks/useRouteCache';

const { caches } = useRouteCache();

function getComponent(component) {
  const route = useRoute();
  const fullPath = route.fullPath;

  const newCom = createVNode({
    name: fullPath,
    render: () => component,
  });

  return newCom;
}
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="caches">
      <component :is="getComponent(Component)" />
    </keep-alive>
  </router-view>
</template>
