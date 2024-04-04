<script setup>
import { menuMap } from '@/config/menu';
import { Loading3QuartersOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';
import useRouteCache from '@/hooks/useRouteCache';
import draggable from 'vuedraggable';
import { localStore } from '@/utils/store';

const localTabs = localStore.get('page-tabs') || [];

const { removeCache, refresh: refreshTab } = useRouteCache();
const route = useRoute();
const router = useRouter();
const tabs = ref(localTabs);
const activeKey = ref();

function changeTabs() {
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
    fullPath: route.fullPath,
    params: route.params,
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
  removeCache(currentTab.componentName);
  tabs.value.splice(index, 1);
}

function syncTabsWithLocal() {
  localStore.set('page-tabs', tabs.value);
}

function tabChange(active) {
  activeKey.value = active;
  router.push(active);
}

watch(() => route.path, changeTabs, {
  immediate: true,
});

watch(() => tabs.value, syncTabsWithLocal, {
  immediate: true,
  deep: true,
});
</script>

<template>
  <div class="page-tabs">
    <draggable
      v-model="tabs"
      item-key="fullPath"
      class="page-tabs-transtion"
      :component-data="{ type: 'transtion-group' }"
      :animation="500"
    >
      <template #item="{ element }">
        <div
          :key="element.fullPath"
          class="page-tab"
          :class="{ 'page-tab-active': activeKey === element.fullPath }"
          @click="tabChange(element.fullPath)"
        >
          <div class="page-tab-inner">
            <Loading3QuartersOutlined
              class="page-tab__icon page-tab__refresh"
              @click.stop="refresh(element.fullPath)"
            ></Loading3QuartersOutlined>
            <span>{{ element.label }}</span>
            <CloseCircleOutlined
              v-if="tabs.length > 1"
              class="page-tab__icon page-tab__close"
              @click.stop="remove(element.fullPath)"
            ></CloseCircleOutlined>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<style scoped lang="scss">
.page-tabs {
  background: #fff;
  
  .page-tabs-transtion {
    padding: 8px 0 0 8px;
    overflow: hidden;
  }

  .page-tab {
    display: inline-block;
    padding: 4px 8px;
    margin-right: 4px;
    font-size: 14px;
    border: 1px solid #cecece;
    border-radius: 2px;
    cursor: pointer;
    overflow: hidden;

    &:not(.page-tab-active):hover {
      color: #4876e6ad;
    }
  }

  .page-tab-active {
    color: #4876e6;
    border-color: #4876e6;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      background: #4876e6;
      left: -8px;
      top: -8px;
      transform: rotate(45deg);
    }

    .page-tab__refresh {
      cursor: pointer;
    }
  }

  .page-tab-inner {
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

  .page-tab__refresh {
    cursor: not-allowed;
  }
}
</style>
