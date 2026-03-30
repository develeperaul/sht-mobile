import { boot } from 'quasar/wrappers';
import useProfileStore from 'src/stores/profileStore';

export default boot(({ router }) => {
  const profileStore = useProfileStore();

  router.beforeEach(async (to, from, next) => {
    // Ждем стор сразу, если нужны проверки, чтобы избежать гонок данных
    if (to.meta.auth || to.meta.guest) {
      await profileStore.isReady;
    }

    const redirectPath = sessionStorage.getItem('redirectAfterPin');
    const isAuthenticated = !!profileStore.profile;

    // 1. Обработка отложенного редиректа (только если авторизованы)
    if (redirectPath && isAuthenticated) {
      sessionStorage.removeItem('redirectAfterPin');
      return next(redirectPath);
    }

    // 2. Защита роутов
    if (to.meta.auth && !isAuthenticated) {
      // Сохраняем путь, только если его там еще нет
      if (!redirectPath) sessionStorage.setItem('redirectAfterPin', to.fullPath);
      return next({ name: 'auth' });
    }

    if (to.meta.guest && isAuthenticated) {
      return next({ name: 'home' });
    }

    next();
  });
});

