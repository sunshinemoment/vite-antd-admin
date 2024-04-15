<script setup>
const open = ref(false);
const current = ref(null);

async function show(data) {
  open.value = true;
  if (data) {
    current.value = data;
  }
}

function hide() {
  open.value = false;
}

const afterClose = () => {
  current.value = null;
};

defineExpose({
  show,
  hide,
});
</script>

<template>
  <a-modal
    :title="`${current ? `【${current.name}】详情` : '详情'}`"
    v-model:open="open"
    :after-close="afterClose"
  >
    <a-descriptions :column="1" v-if="current">
      <a-descriptions-item label="姓名">{{ current.name }}</a-descriptions-item>
      <a-descriptions-item label="年龄">{{ current.age }}</a-descriptions-item>
      <a-descriptions-item label="地址">{{ current.address }}</a-descriptions-item>
    </a-descriptions>
    <template #footer>
      <a-button key="submit" type="primary" @click="open = false">关闭</a-button>
    </template>
  </a-modal>
</template>
