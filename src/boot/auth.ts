import { boot } from 'quasar/wrappers';
import useProfileStore from 'src/stores/profileStore';

export default boot(({ router }) => {
  const profileStore = useProfileStore();

  router.beforeEach(async (to, from, next) => {

    if(to.meta.auth || to.meta.guest) {
      await profileStore.isReady;
      if(to.meta.auth && !profileStore.profile) {
        next({ name: 'auth' });
      } else if(to.meta.guest && profileStore.profile) {
        next({ name: 'home' });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});
