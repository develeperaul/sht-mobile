import { computed } from 'vue';

function sanitizeHtmlString(html: string | undefined | null): string {
  if (!html) return '';

  if (typeof window === 'undefined') return html;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const removeStyleAttributes = (element: Element) => {
    element.removeAttribute('style');
    Array.from(element.children).forEach((child) => removeStyleAttributes(child));
  };

  removeStyleAttributes(doc.body);
  return doc.body.innerHTML;
}

export function useSanitizeHtml(source: () => string | undefined | null) {
  return {
    sanitized: computed(() => sanitizeHtmlString(source())),
    sanitizeHtml: sanitizeHtmlString,
  };
}
