<script setup>
import * as ConstantRouteName from '@/constants/route-name';
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="[ConstantRouteName.TABLE_LIST]">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
