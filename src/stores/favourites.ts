import { defineStore } from 'pinia';
import { ref } from 'vue';

const STORAGE_KEY = 'favItems';

export const useFavouritesStore = defineStore('favouritesStore', () => {
  const items = ref<string[]>([]);

  function append(id: string) {
    items.value.push(id);
  }

  function has(id: string) {
    return items.value.includes(id);
  }

  function remove(id: string) {
    items.value = items.value.filter(item => item !== id);
  }

  function toggle(id: string) {
    has(id) ? remove(id) : append(id);
  }

  function init() {
    const json = localStorage.getItem(STORAGE_KEY);
    if(json) {
      try {
        const values = JSON.parse(json) as string[];
        items.value = values;
      } catch(e) {
        console.log(e);
        items.value = [];
      }
    } else {
      items.value = [];
    }
  }

  function sync() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value));
  }

  return {
    items,
    sync,
    init,
    append,
    remove,
    has,
    toggle,
  }
});
