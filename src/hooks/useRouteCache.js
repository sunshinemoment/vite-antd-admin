const caches = ref([]);

export default function useRouteCache() {
  const route = useRoute();

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

  return {
    caches,
    addCache,
    removeCache,
    collectCaches,
  };
}
