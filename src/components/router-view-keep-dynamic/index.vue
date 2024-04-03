<script setup>
import { createVNode } from 'vue';
import useRouteCache from '@/hooks/useRouteCache';

const { caches, render: renderMap } = useRouteCache();

// 避免getComponent每次生成新实例
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
    render() {
      // 使用刷新缓存
      if (renderMap.value[fullPath]) return component;
      return null;
    },
  });

  cacheList[fullPath] = newCom;

  return newCom;
}
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="caches">
      <component :is="getComponent(Component, route)" />
    </keep-alive>
  </router-view>
</template>
