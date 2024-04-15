<script setup>
import debounce from 'lodash/debounce';

const emits = defineEmits(['update:value']);
const props = defineProps({
  value: [String, Number],
  getData: {
    type: Function,
    required: true,
  },
  pageSize: {
    type: Number,
    default: 50,
  },
});

const val = ref(props.value);
const list = ref([]);
const fetching = ref(false);
const page = ref(1);
const keywords = ref();
const complete = ref(false);

let lastFetchId = 0;

const change = (val) => {
  emits('update:value', val);
};

const search = (value) => {
  complete.value = false;
  page.value = 1;
  keywords.value = value;
  fetchList();
};

const fetchList = debounce(() => {
  lastFetchId += 1;
  const fetchId = lastFetchId;
  fetching.value = true;
  props
    .getData({ pageNo: page.value, pageSize: props.pageSize, keywords: keywords.value })
    .then((body) => {
      if (fetchId !== lastFetchId) {
        // TODO 这里可添加取消请求发送功能
        return;
      }

      const data = body.list.map((item) => ({
        label: `${item.name}`,
        value: item.id,
      }));

      if (page.value === 1) {
        list.value = data;
      } else {
        list.value.push(...data);
      }

      /** 后台获取的数据比请求翻页的数据量少的话，即为数据加载完成 */
      if (data.length < props.pageSize) {
        complete.value = true;
      }

      page.value = page.value + 1;
      fetching.value = false;
    });
}, 300);

const popupScroll = (e) => {
  if (complete.value) return;
  const { scrollHeight, scrollTop, clientHeight } = e.target;
  if (scrollHeight - scrollTop === clientHeight) {
    if (fetching.value) return;
    fetchList();
  }
};

fetchList();
</script>

<template>
  <a-select
    show-search
    v-model:value="val"
    placeholder="请选择"
    style="width: 186px"
    :filter-option="false"
    @change="change"
    @search="search"
    @popupScroll="popupScroll"
  >
    <template v-if="fetching" #notFoundContent>
      <a-spin size="small" />
    </template>
    <a-select-option v-for="item in list" :key="item.id" :value="item.value">
      {{ item.label }}
    </a-select-option>
    <a-select-option v-if="!complete" disabled style="text-align: center">
      Loading...
    </a-select-option>
  </a-select>
</template>
