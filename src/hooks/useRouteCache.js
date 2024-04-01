const caches = ref([]);
const render = ref({});

export default function useRouteCache() {
  const route = useRoute();

  function addCache(componentName) {
    if (Array.isArray(componentName)) {
      componentName.forEach(addCache);
      return;
    }
    if (caches.value.includes(componentName)) return;
    caches.value.push(componentName);
    render.value[componentName] = true;
  }

  function removeCache(componentName) {
    if (Array.isArray(componentName)) {
      componentName.forEach(removeCache);
      return;
    }

    const index = caches.value.indexOf(componentName);
    if (index >= 0) {
      return caches.value.splice(index, 1);
    }
  }

  function collectRouteCaches() {
    /** 动态路由缓存 */
    if (Object.keys(route.params).length && route.meta?.keepAlive) {
      addCache(route.fullPath);
    }

    route.matched.forEach((routeMatch) => {
      const componentDef = routeMatch.components?.default;
      const componentName = componentDef?.name;
      if (!componentName) return;
      if (routeMatch.meta?.keepAlive) {
        addCache(componentName);
      }
    });
  }

  function collectCaches() {
    watch(() => route.path, collectRouteCaches, { immediate: true });
  }

  function refresh(componentName) {
    render.value[componentName] = false;
    nextTick(() => {
      render.value[componentName] = true;
    });
  }

  return {
    caches,
    addCache,
    removeCache,
    collectCaches,
    render,
    refresh,
  };
}
