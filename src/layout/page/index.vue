<script setup>
import { useScreen } from 'vue-screen';
import PageSider from './coms/page-sider.vue';
import PageHeader from './coms/page-header.vue';
import PageTabs from './coms/page-tabs.vue';
import RouterViewKeepInclude from '@/components/router-view-keep-include';
import useRouteCache from '@/hooks/useRouteCache';

const { collectCaches } = useRouteCache();
const screen = useScreen();
const collapsed = ref(false);
const layoutRef = ref();

collectCaches();
</script>

<template>
  <a-drawer
    v-if="screen.portrait"
    placement="left"
    :width="200"
    :visible="collapsed"
    :closable="false"
    :getContainer="layoutRef"
    :bodyStyle="{
      padding: 0,
    }"
    @close="collapsed = false"
  >
    <div class="layout-page__sider--m">
      <PageSider :collapsed="false"></PageSider>
    </div>
  </a-drawer>
  <a-layout class="layout-page" ref="layoutRef">
    <a-layout-sider
      v-if="!screen.portrait"
      v-model:collapsed="collapsed"
      class="layout-page__sider"
    >
      <PageSider :collapsed="collapsed"></PageSider>
    </a-layout-sider>
    <a-layout class="layout-page__main">
      <a-layout-header class="layout-page__header">
        <PageHeader @toggleCollapsed="collapsed = !collapsed" :collapsed="collapsed"></PageHeader>
      </a-layout-header>
      <a-layout-content class="layout-page__content">
        <div class="layout-page__content-tabs">
          <PageTabs></PageTabs>
        </div>
        <div class="layout-page__content-main">
          <RouterViewKeepInclude></RouterViewKeepInclude>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>
.layout-page__sider {
  height: 100vh;
}

.layout-page__sider--m {
  position: relative;
  min-height: 100vh;
  overflow-y: auto;
  background: #001529;
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
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
}

.layout-page__content-main {
  flex: auto;
}
</style>
