import { computed } from 'vue';
import Typograf from 'typograf';

const tp = new Typograf({ locale: ['ru', 'en-US'] });

function typografText(text: string | undefined | null): string {
  if (!text) return '';
  return tp.execute(text);
}

export function useTypograf(source: () => string | undefined | null) {
  return {
    typografed: computed(() => typografText(source())),
    typograf: typografText,
  };
}
