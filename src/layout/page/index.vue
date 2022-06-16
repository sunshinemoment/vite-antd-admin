<script setup>
import PageSider from './coms/page-sider.vue';
import PageHeader from './coms/page-header.vue';

const collapsed = ref(false);
</script>

<template>
  <a-layout class="layout-page">
    <a-layout-sider class="layout-page__sider">
      <PageSider :collapsed="collapsed"></PageSider>
    </a-layout-sider>
    <a-layout class="layout-page__main">
      <a-layout-header class="layout-page__header">
        <PageHeader @toggleCollapsed="collapsed = !collapsed" :collapsed="collapsed"></PageHeader>
      </a-layout-header>
      <a-layout-content class="layout-page__content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>
.layout-page__sider {
  height: 100vh;
}

.layout-page__main {
  height: 100vh;
  overflow-x: visible;
  overflow-y: auto;
  background: #f0f2f5;
}

.layout-page__header {
  position: relative;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 12px;
  background: #fff;
  box-shadow: 0 2px 2px 0 rgb(29 33 41 / 12%);
}

.layout-page__content {
  min-height: calc(100vh - 60px);
}
</style>
