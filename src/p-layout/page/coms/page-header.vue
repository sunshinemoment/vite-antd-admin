<script setup>
import { useRoute, useRouter } from 'vue-router';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CaretDownFilled,
  UserOutlined,
} from '@ant-design/icons-vue';
import { useScreen } from 'vue-screen';
import { menuMap } from '@/config/menu';
import uniqBy from 'lodash/uniqBy';
import { localStore } from '@/utils/store';
import * as ConstantRouteName from '@/constants/route-name';

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
});

const screen = useScreen();
const emits = defineEmits(['toggleCollapsed']);
const route = useRoute();
const router = useRouter();
const breadcrumbs = computed(() => {
  const matched = route.matched.slice(1);
  const matchedItems = uniqBy(matched, 'path')
    .filter((item) => item.name)
    .map((item) => {
      const currentMenu = menuMap[item.name] || {};
      return {
        key: currentMenu.key,
        title: currentMenu.title,
      };
    });

  return matchedItems;
});

const loginOut = () => {
  localStore.clearAll();
  location.reload();
};

const toSetting = () => {
  router.push({
    name: ConstantRouteName.SETTING,
  });
};
</script>

<template>
  <div class="page-header__left">
    <a-button type="text" @click="emits('toggleCollapsed')">
      <MenuUnfoldOutlined v-if="props.collapsed"></MenuUnfoldOutlined>
      <MenuFoldOutlined v-else></MenuFoldOutlined>
    </a-button>
    <a-breadcrumb v-if="screen.landscape">
      <a-breadcrumb-item v-for="(item, i) in breadcrumbs" :key="item">
        <router-link v-if="i !== breadcrumbs.length - 1" :to="{ name: item.key }">
          {{ item.title }}
        </router-link>
        <span v-else>{{ item.title }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
  <div class="page-header__right">
    <a-popover placement="bottomRight">
      <template #content>
        <a-space direction="vertical" size="small" style="display: flex" class="header__actions">
          <a-button type="text" block @click="toSetting">设置中心</a-button>
          <a-button type="text" block @click="loginOut">退出登录</a-button>
        </a-space>
      </template>
      <div class="header__user">
        <a-avatar :size="32">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <a-space direction="vertical" :size="2" class="header__user-info">
          <p class="header__user-name">卞赛军</p>
          <p class="header__user-email">875848407@qq.com</p>
        </a-space>
        <CaretDownFilled></CaretDownFilled>
      </div>
    </a-popover>
  </div>
</template>

<style lang="scss" scoped>
.page-header__left {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 24px;
}

.header__actions {
  width: 120px;

  :deep {
    .ant-btn {
      text-align: left;
    }
  }
}

.header__user {
  display: flex;
  align-items: center;

  .header__user-info {
    margin: 0 12px 0 8px;
  }

  .header__user-name,
  .header__user-email {
    margin: 0;
  }

  .header__user-name {
    color: #1d2129;
    font-size: 15px;
    line-height: 18px;
  }

  .header__user-email {
    color: #86909c;
    font-size: 13px;
    line-height: 16px;
  }
}
</style>
