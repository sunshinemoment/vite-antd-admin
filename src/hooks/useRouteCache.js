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
    collectCaches,
  };
}
