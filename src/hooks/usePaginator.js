import { usePagination } from 'vue-request';

const getInitialData = () => ({
  page: 1,
  pageSize: 10,
  totalCount: 0,
  list: [],
});

export default function usePaginator(service, options = {}) {
  const paginatorData = usePagination(service, {
    initialData: getInitialData(),
    formatResult([err, data]) {
      if (err) {
        return getInitialData();
      }
      return data;
    },
    pagination: {
      currentKey: 'pageNo',
      pageSizeKey: 'pageSize',
      totalKey: 'totalCount',
    },
    ...options,
  });

  const list = computed(() => {
    return paginatorData.data.value?.list || [];
  });

  return {
    ...paginatorData,
    list,
  };
}
