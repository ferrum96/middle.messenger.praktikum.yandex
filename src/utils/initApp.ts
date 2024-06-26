import authController from '../controllers/auth-controller.ts';
import router, { Routes } from '../core/Router.ts';
import store from '../core/Store.ts';
import chatsController from '../controllers/chats-controller.ts';

const initApp = async () => {
  try {
    await authController.getUserInfo();
    await chatsController.getChats();
    if (store.getState().user !== null) {
      store.set('auth', true);
    }
  } catch (error) {
    router.go(Routes.AUTH);
    return;
  }

  router.start();
};

export { initApp };
