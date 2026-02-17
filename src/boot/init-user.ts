import { boot } from 'quasar/wrappers';
import { getProfile } from 'src/api/profile';
import useProfileStore from 'src/stores/profileStore';

export default boot(async ({ app, router }) => {
  const profileStore = useProfileStore();

  getProfile()
    .then(res => {
      profileStore.changeProfile(res.data);
    })
    .catch(e => {
      profileStore.changeProfile(null);
      console.log('Не удалось загрузить пользователя', e);
    });
});
