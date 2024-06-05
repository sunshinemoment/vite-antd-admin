const caches = ref([]);
const render = ref({});
const mounted = ref({});

export default function useRouteCache() {
  const route = useRoute();

  function addRender(componentName) {
    if (Array.isArray(componentName)) {
      componentName.forEach(addRender);
      return;
    }
    render.value[componentName] = true;
  }

  function addCache(componentName) {
    if (Array.isArray(componentName)) {
      componentName.forEach(addCache);
      return;
    }
    if (caches.value.includes(componentName)) return;
    caches.value.push(componentName);
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
      addRender(route.fullPath);
    }

    route.matched.forEach((routeMatch) => {
      const componentDef = routeMatch.components?.default;
      const componentName = componentDef?.name;
      if (!componentName) return;
      if (routeMatch.meta?.keepAlive) {
        addCache(componentName);
      }
      addRender(componentName);
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

  function addMounted(key) {
    mounted.value[key] = true;
  }

  function removeMounted(key) {
    mounted.value[key] = false;
  }

  return {
    addRender,
    caches,
    addCache,
    removeCache,
    collectCaches,
    render,
    refresh,
    mounted,
    addMounted,
    removeMounted,
  };
}
