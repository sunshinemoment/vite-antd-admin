<script setup>
// import useRouteCache from '@/hooks/useRouteCache';

// const { caches } = useRouteCache();
const route = useRoute();
const tabs = ref([]);

const activeKey = ref();

function changeTabs() {
  if (!route.meta?.keepAlive) return;

  const include = tabs.value.some((tab) => tab.fullPath === route.fullPath);

  activeKey.value = route.fullPath;

  if (!include) tabs.value.push({ ...route });
}

watch(() => route.path, changeTabs, {
  immediate: true,
});
</script>

<template>
  <div class="page-tabs">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane v-for="tab in tabs" :key="tab.fullPath" :tab="tab.fullPath"> </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped lang="scss">
.page-tabs {
  background: #fff;

  :deep(.ant-tabs-top > .ant-tabs-nav) {
    margin: 1px;
  }
}
</style>
