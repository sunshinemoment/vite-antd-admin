<script setup>
import { useScreen } from 'vue-screen';
import usePaginator from '@/hooks/usePaginator';
import { getList } from '@/apis/table-list';

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

const screen = useScreen();
const formState = reactive({
  data1: '',
  data2: '',
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
    },
  ],
});

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
</script>

<template>
  <div class="g-page page-table-list">
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
        <a-button type="primary">添加</a-button>
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
</template>
