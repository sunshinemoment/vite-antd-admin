function getRandom() {
  return Math.random().toString(36).slice(-8);
}

export const getList = (query) => {
  const data = {
    list: [...Array(query.pageNo < 3 ? 50 : 10)].map(() => {
      const id = getRandom();
      return {
        id,
        name: id,
      };
    }),
    page: query.pageNo,
    pageSize: query.pageSize,
    totalCount: 50,
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
};
