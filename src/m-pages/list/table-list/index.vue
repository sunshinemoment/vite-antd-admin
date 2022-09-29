<script setup>
import { Modal } from 'ant-design-vue';
import usePaginator from '@/hooks/usePaginator';
import Add from './add';
import Detail from './detail';
import { getList, deleteItem } from '@/apis/table-list';
// import dayjs from 'dayjs';

const columns = [
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

const formState = reactive({
  data1: '',
  data2: '',
  startDate: undefined,
  endDate: undefined,
});
const formRef = ref();
const addRef = ref(null);
const detailRef = ref(null);
const {
  loading: listLoading,
  list,
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

const disabledStartDate = (current) => {
  if (!formState.endDate) return false;
  return current > formState.endDate;
};

const disabledEndDate = (current) => {
  if (!formState.startDate) return false;
  return current < formState.startDate;
};

const paginationChange = (pag) => {
  listRun({
    pageNo: pag.current,
    pageSize: pag.pageSize,
  });
};

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

const addSuccess = () => {
  listRun({
    pageNo: 1,
    pageSize: pageSize.value,
    ...formState,
  });
};

const updateSuccess = () => {
  listRun({
    pageNo: current.value,
    pageSize: pageSize.value,
    ...formState,
  });
};
</script>

<template>
  <div class="g-page page-table-list">
    <!-- 查询条件 -->
    <a-form class="g-page-query" ref="formRef" layout="horizontal" :model="formState">
      <a-row :gutter="10">
        <a-col :xs="12" :sm="12" :md="8" :lg="4">
          <a-form-item label="选项一" name="data1">
            <a-input v-model:value="formState.data1" placeholder="请输入"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="12" :sm="12" :md="8" :lg="4">
          <a-form-item label="选项二" name="data2">
            <a-input v-model:value="formState.data2" placeholder="请输入"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="12" :sm="12" :md="8" :lg="4">
          <a-form-item label="开始日期" name="date-picker">
            <a-date-picker
              style="width: 100%"
              v-model:value="formState.startDate"
              :disabled-date="disabledStartDate"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="12" :sm="12" :md="8" :lg="4">
          <a-form-item label="结束日期" name="date-picker">
            <a-date-picker
              style="width: 100%"
              v-model:value="formState.endDate"
              :disabled-date="disabledEndDate"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item class="g-page-query-actions">
        <a-space :size="10">
          <a-button type="primary" html-type="submit" @click="submitForm"> 查询 </a-button>
          <a-button @click="resetForm"> 重置 </a-button>
        </a-space>
      </a-form-item>
    </a-form>
    <!-- /查询条件 -->

    <!-- 查询列表 -->
    <div class="g-page-list">
      <div class="g-page-actions">
        <a-button type="primary" @click="addRef?.show()">添加</a-button>
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
            <a-button @click="detailRef?.show(record)" size="small" type="link">详情</a-button>
            <a-button @click="addRef?.show(record)" size="small" type="link">编辑</a-button>
            <a-button @click="toDelete(record)" size="small" type="link">删除</a-button>
          </template>
        </template>
      </a-table>
    </div>
    <!-- /查询列表 -->
  </div>
  <Add ref="addRef" @add-success="addSuccess" @update-success="updateSuccess"></Add>
  <Detail ref="detailRef"></Detail>
</template>
