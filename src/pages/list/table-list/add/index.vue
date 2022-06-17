<script setup>
import { message } from 'ant-design-vue';
import { useRequest } from 'vue-request';
import { addItem, updateItem } from '@/apis/table-list';

const defaultFormState = {
  name: undefined,
  age: undefined,
  address: undefined,
};

const emits = defineEmits(['addSuccess', 'updateSuccess']);
const visible = ref(false);
const current = ref(null);
const formState = reactive({ ...defaultFormState });
const formRef = ref();
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

const submitForm = () => {
  formRef.value
    .validate()
    .then(async () => {
      if (current.value) {
        await updateRun({
          id: current.value.id,
          ...formState,
        });
        if (updateError.value) return;
        message.success('编辑成功');
        emits('updateSuccess');
      } else {
        await addRun(formState);
        if (addError.value) return;
        message.success('添加成功');
        emits('addSuccess');
      }
      visible.value = false;
    })
    .catch((error) => {
      console.log('error', error);
    });
};

const afterClose = () => {
  Object.assign(formState, defaultFormState);
  current.value = null;
};

async function show(data) {
  visible.value = true;
  if (data) {
    current.value = data;
    formState.name = data.name;
    formState.age = data.age;
    formState.address = data.address;
  }
}

function hide() {
  visible.value = false;
}

defineExpose({
  show,
  hide,
});
</script>

<template>
  <a-modal
    v-model:visible="visible"
    :title="current ? `【${current.name}】编辑` : '添加'"
    :ok-text="current ? '编辑' : '添加'"
    cancel-text="取消"
    :after-close="afterClose"
    :okButtonProps="{
      loading: current ? updateLoading : addLoading,
    }"
    @ok="submitForm"
  >
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
    </a-form>
  </a-modal>
</template>
