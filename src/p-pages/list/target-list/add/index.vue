<script setup>
import { useRouter, useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { useRequest } from 'vue-request';
import { getItem, addItem, updateItem } from '@/apis/table-list';
import * as ConstantRouteName from '@/constants/route-name';

const defaultFormState = {
  name: undefined,
  age: undefined,
  address: undefined,
};

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const formState = reactive({ ...defaultFormState });
const formRef = ref();
const {
  loading: itemLoading,
  error: itemError,
  run: getItemRun,
  data: itemData,
} = useRequest(getItem, {
  manual: true,
});
const {
  loading: addLoading,
  error: addError,
  run: addRun,
} = useRequest(addItem, {
  manual: true,
});
const {
  loading: updateLoading,
  error: updateError,
  run: updateRun,
} = useRequest(updateItem, {
  manual: true,
});

onMounted(() => {
  if (id) fetchItem();
});

onUnmounted(() => {
  Object.assign(formState, defaultFormState);
});

const submitForm = () => {
  formRef.value
    .validate()
    .then(async () => {
      if (id) {
        await updateRun({
          id,
          ...formState,
        });
        if (updateError.value) return;
        message.success('编辑成功');
      } else {
        await addRun(formState);
        if (addError.value) return;
        message.success('添加成功');
      }
      router.push({
        name: ConstantRouteName.TARGET_LIST,
      });
    })
    .catch((error) => {
      console.log('error', error);
    });
};

const fetchItem = async () => {
  await getItemRun(id);
  if (itemError.value) return;
  if (itemData.value) {
    Object.assign(formState, {
      name: itemData.value.name,
      age: itemData.value.age,
      address: itemData.value.address,
    });
  }
};

const cancel = () => {
  router.push({
    name: ConstantRouteName.TARGET_LIST,
  });
};
</script>

<template>
  <div class="g-page g-page-form--small page-list-add">
    <a-card :loading="itemLoading" :border="false">
      <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" ref="formRef" :model="formState">
        <a-form-item label="姓名" name="name" :rules="[{ required: true, message: '请输入姓名' }]">
          <a-input v-model:value="formState.name" placeholder="请输入"></a-input>
        </a-form-item>
        <a-form-item label="年龄" name="age">
          <a-input-number
            style="width: 100%"
            v-model:value="formState.age"
            placeholder="请输入"
          ></a-input-number>
        </a-form-item>
        <a-form-item label="地址" name="address">
          <a-textarea v-model:value="formState.address" placeholder="请输入"></a-textarea>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 4, span: 20 }">
          <a-space>
            <a-button
              type="primary"
              html-type="submit"
              :loading="id ? updateLoading : addLoading"
              @click="submitForm"
            >
              {{ id ? '编辑' : '添加' }}
            </a-button>
            <a-button @click="cancel">取消</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
