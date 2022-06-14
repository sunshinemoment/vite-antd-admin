<script setup>
function refresh() {
  window.location.reload();
}
</script>

<template>
  <a-result
    class="com-error-page"
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <a-button type="primary" @click="refresh">Refresh</a-button>
    </template>
  </a-result>
</template>

<style lang="scss" scoped>
.com-error-page {
  width: 100%;
}
</style>
