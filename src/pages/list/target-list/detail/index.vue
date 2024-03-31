<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useRequest } from 'vue-request';
import { getItem } from '@/apis/table-list';
import * as ConstantRouteName from '@/constants/route-name';

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const { loading: itemLoading, data: itemData } = useRequest(getItem, {
  defaultParams: [id],
});

onMounted(() => {
  console.log('detail');
});

const back = () => {
  router.push({
    name: ConstantRouteName.TARGET_LIST,
  });
};
</script>

<template>
  <div class="page-list-detail">
    <a-page-header style="border: 1px solid rgb(235 237 240)" title="详情" @back="back" />
    <div class="g-page">
      <a-card :border="false">
        <a-skeleton active v-if="itemLoading" />
        <a-descriptions :column="1" v-else-if="itemData">
          <a-descriptions-item label="姓名">{{ itemData.name }}</a-descriptions-item>
          <a-descriptions-item label="年龄">{{ itemData.age }}</a-descriptions-item>
          <a-descriptions-item label="地址">{{ itemData.address }}</a-descriptions-item>
        </a-descriptions>
      </a-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-list-detail {
  :deep(.ant-page-header) {
    background: #fff;
  }
}
</style>
