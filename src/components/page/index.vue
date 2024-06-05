<script setup>
import useRouteCache from '@/hooks/useRouteCache';

const props = defineProps({
  init: Function,
});
const { mounted, addMounted } = useRouteCache();
const route = useRoute();

onMounted(() => {
  let key = route.name;
  if (Object.keys(route.params).length) {
    key = route.fullPath;
  }
  if (mounted.value[key]) return;
  addMounted(key);
  if (props.init) {
    props.init();
  }
});
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
