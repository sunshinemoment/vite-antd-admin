<script setup>
import { useRouter, useRoute } from 'vue-router';
import SubMenu from '@/components/sub-menu';
import menu from '@/config/menu';

const props = defineProps({
  collapsed: Boolean,
});
const router = useRouter();
const route = useRoute();
const matchedRouteKeys = computed(() => {
  return route.matched.map((item) => item.name).filter((item) => !!item);
});
const openKeys = ref([...matchedRouteKeys.value]);

function toView() {
  router.push('/');
}

function toRoute(item) {
  if (route.name === item.key) {
    return;
  }
  router.push({
    name: item.key,
  });
}
</script>

<template>
  <div class="page-sider__logo" @click="toView">
    <h1 v-if="props.collapsed">
      <img src="@/assets/images/logo.png" alt="logo" />
    </h1>
    <h1 v-else><img src="@/assets/images/logo.png" alt="logo" /></h1>
  </div>
  <div class="page-sider__menu">
    <a-menu theme="dark" mode="inline" :selectedKeys="matchedRouteKeys" v-model:openKeys="openKeys">
      <template v-for="item in menu">
        <template v-if="!item.children || item.hideChildrenInMenu">
          <a-menu-item :key="item.key" @click="toRoute(item)">
            <template v-if="item.icon" #icon>
              <component :is="item.icon"></component>
            </template>
            {{ item.title }}{{ item.icon }}
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :key="item.key" :menu-info="item" @menuClick="toRoute" />
        </template>
      </template>
    </a-menu>
  </div>
</template>

<style lang="scss" scoped>
.page-sider__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  cursor: pointer;

  h1 {
    margin: 0;
    color: #fff;
    font-size: 24px;
  }

  img {
    width: 40px;
  }
}
</style>
