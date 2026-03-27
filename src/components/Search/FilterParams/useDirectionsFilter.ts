import { reactive } from 'vue';

export default function() {
  const params: FilterParams = reactive(getInitialParams());

  function getInitialParams(): FilterParams {
    return {
      price_from: '',
      price_to: '',
      days_count_from: null,
      days_count_to: null,
      is_weekend: null,
      type: null,
    }
  }

  function clear() {
    Object.assign(params, getInitialParams());
  }

  return {
    params,
    clear,
  }
}

export interface FilterParams {
  price_from: string,
  price_to: string,
  days_count_from: number | null,
  days_count_to: number | null,
  is_weekend: '1' | '0' | null,
  type: string | null,
}
