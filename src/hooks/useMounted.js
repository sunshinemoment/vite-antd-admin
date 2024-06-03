export default function useMounted(callback) {
  const isTrigger = ref(true);

  onMounted(() => {
    if (isTrigger.value) {
      callback && callback();
      isTrigger.value = false;
    }
  });

  onActivated(() => {
    if (isTrigger.value) {
      callback && callback();
      isTrigger.value = false;
    }
  });

  onDeactivated(() => {
    isTrigger.value = false;
  });
}
