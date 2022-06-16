export function treeToMap(tree, key = 'key') {
  const fn = (tree) => {
    return tree.reduce((pre, next) => {
      return {
        ...pre,
        [next[key]]: next,
        ...(next.children && next.children.length ? fn(next.children) : null),
      };
    }, {});
  };
  return fn(tree);
}
