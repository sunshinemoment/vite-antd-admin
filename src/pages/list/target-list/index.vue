<script setup>
import { useRouter } from 'vue-router';
import { Modal } from 'ant-design-vue';
import { useScreen } from 'vue-screen';
import usePaginator from '@/hooks/usePaginator';
import { getList, deleteItem } from '@/apis/table-list';
import * as ConstantRouteName from '@/constants/route-name';
import useParamIdPath from '@/hooks/useParamIdPath';

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作',
    width: '150px',
    key: 'action',
  },
];

const router = useRouter();
const screen = useScreen();
const formState = reactive({
  data1: '',
  data2: '',
});
const formRef = ref();
const getPathByParamId = useParamIdPath();

const {
  list,
  loading: listLoading,
  current,
  pageSize,
  total,
  run: listRun,
} = usePaginator(getList, {
  defaultParams: [
    {
      pageNo: 1,
      pageSize: 10,
      ...formState,
    },
  ],
});

const submitForm = () => {
  formRef.value
    .validate()
    .then(() => {
      listRun({
        pageNo: 1,
        pageSize: pageSize.value,
        ...formState,
      });
    })
    .catch((error) => {
      console.log('error', error);
    });
};
const resetForm = () => {
  formRef.value.resetFields();
  listRun({
    pageNo: 1,
    pageSize: pageSize.value,
    ...formState,
  });
};

const paginationChange = (pag) => {
  listRun({
    pageNo: pag.current,
    pageSize: pag.pageSize,
    ...formState,
  });
};

const toAdd = () => {
  router.push({
    name: ConstantRouteName.TARGET_LIST_ADD,
  });
};

const toDetail = (record) => {
  router.push(getPathByParamId(ConstantRouteName.TARGET_LIST_DETAIL, record.id));
};

const toUpdate = (record) => {
  router.push({
    name: ConstantRouteName.TARGET_LIST_UPDATE,
    params: {
      id: record.id,
    },
  });
};

const toDelete = (record) => {
  Modal.confirm({
    title: '提示',
    content: `确定要删除【${record.name}】吗`,
    cancelText: '取消',
    okText: '删除',
    async onOk() {
      return await new Promise((resolve, reject) => {
        deleteItem(record.id)
          .then(() => {
            resolve(true);
            deleteUpdatePage();
          })
          .catch(() => {
            reject();
          });
      });
    },
    onCancel() {
      console.log('Cancel');
    },
    class: 'test',
  });
};

const deleteUpdatePage = () => {
  listRun({
    pageNo: list.value.length === 1 ? current.value - 1 || 1 : current.value,
    pageSize: pageSize.value,
    ...formState,
  });
};

onMounted(() => {
  console.log('target-list');
});
</script>

<template>
  <div class="g-page page-target-list">
    <!-- 查询条件 -->
    <a-form
      class="g-page-query"
      ref="formRef"
      :layout="screen.portrait ? 'vertical' : 'inline'"
      :model="formState"
    >
      <a-form-item label="选项一" name="data1">
        <a-input v-model:value="formState.data1" placeholder="请输入"></a-input>
      </a-form-item>
      <a-form-item label="选项二" name="data2">
        <a-input v-model:value="formState.data2" placeholder="请输入"></a-input>
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" html-type="submit" @click="submitForm"> 查询 </a-button>
          <a-button @click="resetForm"> 重置 </a-button>
        </a-space>
      </a-form-item>
    </a-form>
    <!-- /查询条件 -->

    <!-- 查询列表 -->
    <div class="g-page-list">
      <div class="g-page-actions">
        <a-button type="primary" @click="toAdd">添加</a-button>
      </div>
      <a-table
        bordered
        size="middle"
        rowKey="id"
        :loading="listLoading"
        :columns="columns"
        :data-source="list"
        :pagination="{
          current,
          pageSize,
          total,
          size: 'default',
          showSizeChanger: true,
          showQuickJumper: true,
          showSizeChanger: true,
        }"
        @change="paginationChange"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span> 姓名 </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
          </template>
          <template v-else-if="column.key === 'tags'">
            <span>
              <a-tag
                v-for="tag in record.tags"
                :key="tag"
                :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
              >
                {{ tag.toUpperCase() }}
              </a-tag>
            </span>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-button @click="toDetail(record)" size="small" type="link">详情</a-button>
            <a-button @click="toUpdate(record)" size="small" type="link">编辑</a-button>
            <a-button @click="toDelete(record)" size="small" type="link">删除</a-button>
          </template>
        </template>
      </a-table>
    </div>
    <!-- /查询列表 -->
  </div>
</template>
