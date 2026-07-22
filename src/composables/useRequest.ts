import { ref } from 'vue';
import { type UnwrapRef, type WatchSource, watch } from 'vue';
import { fetchWithRequestCache, getRequestCache } from 'src/utils/requestCache';

export type Params<T> = {
  immediate: boolean,
  watch: WatchSource[],
  onSuccess: (res: T) => void,
  cacheKey: string | (() => string),
  cacheTtl: number,
  staleWhileRevalidate: boolean,
}

export default function<T, E>(fetchFn: (...args: any[]) => Promise<T>, params: Partial<Params<T>> = {}) {
  params = Object.assign({}, {
    immediate: true,
    cacheTtl: 5 * 60 * 1000,
    staleWhileRevalidate: false,
  }, params);

  const loading = ref(false);
  const data = ref<T | null>(null);
  const error = ref<E | null>(null);

  const getCacheKey = () => {
    if(!params.cacheKey) return null;
    return typeof params.cacheKey === 'function' ? params.cacheKey() : params.cacheKey;
  }

  async function send(options: { force?: boolean } = {}) {
    try {
      const cacheKey = getCacheKey();

      if (cacheKey && !options.force) {
        const cached = getRequestCache<T>(cacheKey);

        if (cached) {
          data.value = cached as UnwrapRef<T>;
          if(params.onSuccess) params.onSuccess(cached);

          if(params.staleWhileRevalidate) {
            fetchWithRequestCache(cacheKey, params.cacheTtl!, fetchFn, true)
              .then((res) => {
                data.value = res as UnwrapRef<T>;
                if(params.onSuccess) params.onSuccess(res);
              })
              .catch((e) => {
                error.value = e as UnwrapRef<E>;
              });
          }

          return cached;
        }
      }

      loading.value = true;
      const res = cacheKey
        ? await fetchWithRequestCache(cacheKey, params.cacheTtl!, fetchFn, options.force)
        : await fetchFn();
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
