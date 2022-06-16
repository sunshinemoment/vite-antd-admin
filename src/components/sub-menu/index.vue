<script>
export default defineComponent({
  name: 'sub-menu',
});
</script>

<script setup>
const props = defineProps({
  menuInfo: {
    type: Object,
    require: true,
  },
});
const emits = defineEmits(['menuClick']);
</script>

<template>
  <a-sub-menu v-if="props.menuInfo" :key="props.menuInfo.key">
    <template v-if="props.menuInfo.icon" #icon>
      <component :is="props.menuInfo.icon"></component>
    </template>
    <template #title>{{ props.menuInfo.title }}</template>
    <template v-for="item in props.menuInfo.children">
      <template v-if="item.children && !item.hideChildrenInMenu">
        <sub-menu
          :menu-info="item"
          :key="item.key"
          @menuClick="emits('menuClick', $event)"
        ></sub-menu>
      </template>
      <template v-else>
        <a-menu-item :key="item.key" @click="emits('menuClick', item)">
          <template v-if="item.icon" #icon>
            <component :is="item.icon"></component>
          </template>
          {{ item.title }}
        </a-menu-item>
      </template>
    </template>
  </a-sub-menu>
</template>
