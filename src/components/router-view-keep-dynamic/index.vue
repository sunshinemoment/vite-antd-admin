<script setup>
import { createVNode } from 'vue';
import useRouteCache from '@/hooks/useRouteCache';

const { caches } = useRouteCache();

const cacheList = {};

function getComponent(component) {
  const route = useRoute();
  const fullPath = route.fullPath;

  if (!component) return null;

  if (cacheList[fullPath]) {
    return cacheList[fullPath];
  }

  const newCom = createVNode({
    name: fullPath,
    render: () => component,
  });

  cacheList[fullPath] = newCom;

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
