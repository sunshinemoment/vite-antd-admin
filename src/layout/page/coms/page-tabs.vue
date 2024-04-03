<script setup>
import { menuMap } from '@/config/menu';
import { Loading3QuartersOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';
import useRouteCache from '@/hooks/useRouteCache';

const { removeCache, refresh: refreshTab } = useRouteCache();
const route = useRoute();
const router = useRouter();
const tabs = ref([]);

const activeKey = ref();

function changeTabs() {
  if (!route.meta?.keepAlive) return;

  const currentTab = tabs.value.find((tab) => tab.fullPath === route.fullPath);

  if (currentTab) {
    activeKey.value = currentTab.fullPath;
    return;
  }

  let componentName;

  if (Object.keys(route.params).length) {
    /** 动态路由缓存 组件名称等于该链接地址 */
    componentName = route.fullPath;
  } else {
    const routeMatch = route.matched[route.matched.length - 1];
    const componentDef = routeMatch.components?.default;
    componentName = componentDef?.name || route.name;
  }

  const tab = {
    ...route,
    label: route.params.id || menuMap[route.name]?.title || route.fullPath,
    componentName,
  };

  activeKey.value = tab.fullPath;

  tabs.value.push(tab);
}

function refresh(fullPath) {
  if (fullPath !== activeKey.value) return;

  const currentTab = tabs.value.find((tab) => tab.fullPath === fullPath);

  if (!currentTab) return;

  if (Object.keys(currentTab.params).length) {
    refreshTab(currentTab.fullPath);
    return;
  }

  refreshTab(currentTab.componentName);
}

function remove(fullPath) {
  if (tabs.value.length === 1) return;

  const index = tabs.value.findIndex((tab) => tab.fullPath === fullPath);
  if (index < 0) return;

  if (activeKey.value === fullPath) {
    const preTab = tabs.value[index - 1];
    const nextTab = tabs.value[index + 1];
    if (preTab) {
      activeKey.value = preTab.fullPath;
      router.push(preTab.fullPath);
    } else if (nextTab) {
      activeKey.value = nextTab.fullPath;
      router.push(nextTab.fullPath);
    }
  }

  const currentTab = tabs.value[index];
  console.log(currentTab, 123);
  removeCache(currentTab.componentName);
  tabs.value.splice(index, 1);
}

function tabChange(activeKey) {
  router.push(activeKey);
}

watch(() => route.path, changeTabs, {
  immediate: true,
});
</script>

<template>
  <div class="page-tabs">
    <a-tabs v-model:activeKey="activeKey" type="card" @change="tabChange">
      <a-tab-pane v-for="tab in tabs" :key="tab.fullPath">
        <template #tab>
          <div class="page-tab">
            <Loading3QuartersOutlined
              class="page-tab__icon page-tab__refresh"
              @click.stop="refresh(tab.fullPath)"
            ></Loading3QuartersOutlined>
            <span>{{ tab.label }}</span>
            <CloseCircleOutlined
              v-if="tabs.length > 1"
              class="page-tab__icon page-tab__close"
              @click.stop="remove(tab.fullPath)"
            ></CloseCircleOutlined>
          </div>
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped lang="scss">
.page-tabs {
  background: #fff;

  :deep(.ant-tabs-top > .ant-tabs-nav) {
    margin: 1px;
  }

  :deep(.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab) {
    opacity: 0.6;
    .page-tab__refresh {
      cursor: not-allowed;
    }
  }

  :deep(.ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab-active) {
    opacity: 1;
    .page-tab__refresh {
      cursor: pointer;
    }
  }
}

.page-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: space-between;
}

.page-tab__icon {
  opacity: 0.6;
  margin: 0 !important;
  transition: all 0.2s;
  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }
}
</style>
