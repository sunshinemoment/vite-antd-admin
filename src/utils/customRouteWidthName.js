import loadable from '@/utils/loadable';

export default function customRouteWidthName(name, component) {
  const newComp = loadable(component);
  return defineComponent({
    name,
    render: () => h(newComp),
  });
}
