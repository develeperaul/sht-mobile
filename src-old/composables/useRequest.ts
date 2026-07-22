import { ref } from 'vue';
import { type UnwrapRef, type WatchSource, watch } from 'vue';

export type Params<T> = {
  immediate: boolean,
  watch: WatchSource[],
  onSuccess: (res: T) => void,
}

export default function<T, E>(fetchFn: (...args: any[]) => Promise<T>, params: Partial<Params<T>> = {}) {
  params = Object.assign({}, {
    immediate: true,
  }, params);

  const loading = ref(false);
  const data = ref<T | null>(null);
  const error = ref<E | null>(null);

  async function send() {
    try {
      loading.value = true;
      const res = await fetchFn();
      data.value = res;
      if(params.onSuccess) params.onSuccess(res);
      return res;
    } catch(e) {
      data.value = null;
      error.value = e as UnwrapRef<E>;
      return null;
    } finally {
      loading.value = false;
    }
  }

  if(params.immediate) {
    send();
  }

  if(params.watch) {
    params.watch.forEach(w => {
      watch(w, send);
    });
  }

  return {
    loading,
    data,
    error,
    send,
  }
}
