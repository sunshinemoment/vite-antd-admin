<script setup>
import useRouteCache from '@/hooks/useRouteCache';

const { caches } = useRouteCache();
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="caches">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
