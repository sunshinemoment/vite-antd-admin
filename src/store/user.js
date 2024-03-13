import { defineStore } from 'pinia';

const useStore = defineStore('user', {
  state() {
    return {
      loading: true,
      error: null,
      detail: null,
    };
  },
});

export default useStore;
