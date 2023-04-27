<script setup>
import LogicFlow from '@logicflow/core';
import '@logicflow/core/dist/style/index.css';

const containerRef = ref();

onMounted(() => {
  initLogicFlow();
});

function initLogicFlow() {
  const lf = new LogicFlow({
    container: containerRef.value,
    grid: true,
  });

  lf.render();
}
</script>

<template>
  <div class="g-page page-logic-flow">
    <div class="container" ref="containerRef"></div>
  </div>
</template>

<style lang="scss" scoped>
.page-logic-flow,
.container {
  width: 100%;
  height: 100%;
}
</style>