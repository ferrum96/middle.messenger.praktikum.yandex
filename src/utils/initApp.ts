// import authController from '../controllers/auth-controller.ts';
import router, { Routes } from './Router.ts';
import store from './Store.ts';
// import chatsController from '../controllers/chats-controller.ts';

const initApp = async () => {
  try {
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
