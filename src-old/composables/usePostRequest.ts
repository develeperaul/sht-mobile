import { ref } from 'vue';
import { Notify } from 'quasar';

export default function<K, T extends (body: K) => Promise<any>>(
  fetchFn: T,
  getBody: () => K,
  onSuccess: (res: Awaited<ReturnType<T>>) => void = () => {},
  errorText?: string,
  onFailed?: (e: unknown) => void,
) {
  const loading = ref(false);

  async function send() {
    try {
      loading.value = true;
      const res = await fetchFn(getBody());
      onSuccess(res);
      return res;
    } catch(e) {
      console.log(e);
      if(onFailed) onFailed(e);
      Notify.create({
        type: 'negative',
        message: errorText ?? 'Не удалось выполнить запрос!',
      });
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    send,
  }
}
