import { boot } from 'quasar/wrappers';
import { useFavouritesStore } from 'src/stores/favourites';

export default boot(() => {
  const favStore = useFavouritesStore();
  favStore.init();
});
