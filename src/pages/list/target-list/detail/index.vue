<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useRequest } from 'vue-request';
import { getItem } from '@/apis/table-list';
import * as ConstantRouteName from '@/constants/route-name';

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const { data: itemData } = useRequest(getItem, {
  defaultParams: [id],
});

const back = () => {
  router.push({
    name: ConstantRouteName.TARGET_LIST,
  });
};
</script>

<template>
  <div class="g-page page-list-detail">
    <a-descriptions :column="1" v-if="itemData">
      <a-descriptions-item label="姓名">{{ itemData.name }}</a-descriptions-item>
      <a-descriptions-item label="年龄">{{ itemData.age }}</a-descriptions-item>
      <a-descriptions-item label="地址">{{ itemData.address }}</a-descriptions-item>
      <a-descriptions-item>
        <a-button type="primary" @click="back">返回</a-button>
      </a-descriptions-item>
    </a-descriptions>
    <a-skeleton v-else />
  </div>
</template>
