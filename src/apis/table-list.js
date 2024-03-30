function getRandom() {
  return Math.random().toString(36).slice(-8);
}

export const getList = (query) => {
  const data = {
    list: [
      {
        id: getRandom(),
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        id: getRandom(),
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
      {
        id: getRandom(),
        name: '刘德华',
        age: 42,
        address: '西湖区湖底公园1号',
      },
      {
        id: getRandom(),
        name: '李连杰',
        age: 42,
        address: '西湖区湖底公园1号',
      },
      {
        id: getRandom(),
        name: '成龙',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ],
    page: query.pageNo,
    pageSize: query.pageSize,
    totalCount: 50,
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([null, data]);
    }, 500);
  });
};

export const addItem = (data) => {
  console.log('添加的数据');
  console.log(data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

export const updateItem = (data) => {
  console.log('编辑的数据');
  console.log(data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

export const deleteItem = (id) => {
  console.log('删除的数据');
  console.log(id);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

export const getItem = (id) => {
  console.log('需要获取的数据');
  console.log(id);
  return new Promise((resolve) => {
    const data = {
      id,
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    };
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
};
