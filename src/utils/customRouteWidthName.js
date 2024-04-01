import loadable from '@/utils/loadable';
import useRouteCache from '@/hooks/useRouteCache';

const { render: renderMap } = useRouteCache();

export default function customRouteWidthName(name, component) {
  const newComp = loadable(component);
  return defineComponent({
    name,
    render() {
      // 使用刷新缓存
      if (renderMap.value[name]) return h(newComp);
      return null;
    },
  });
}
