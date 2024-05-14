import router, { Routes } from '../core/router/Router.ts';
import authApi from '../api/auth-api.ts';
import store from '../core/store/Store.ts';
import chatsController from './chats-controller.ts';
import { CreateUser, LoginRequestData } from '../api/types.ts';
import { User } from '../utils/types.ts';

class AuthController {
  public async createUser(data: CreateUser): Promise<void> {
    try {
      const { status, response } = await authApi.signUp(data);
      if (status === 200) {
        store.set('auth', true);
        await this.getUserInfo();
        await chatsController.getChats();
        router.go(Routes.MESSENGER);
      } else if (status === 500) {
        router.go(Routes.INTERNAL_SERVER_ERROR);
      } else {
        alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async login(data: LoginRequestData): Promise<void> {
    try {
      const { status, response } = await authApi.signIn(data);
      if (status === 200) {
        store.set('auth', true);
        await this.getUserInfo();
        await chatsController.getChats();
        router.go(Routes.MESSENGER);
      } else if (status === 500) {
        router.go(Routes.INTERNAL_SERVER_ERROR);
      } else {
        alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async getUserInfo(): Promise<void> {
    const { status, response } = await authApi.user();
    if (status === 200) {
      store.set('user', JSON.parse(response) as User);
    } else if (status === 401) {
      store.set('user', null);
    } else if (status === 500) {
      router.go(Routes.INTERNAL_SERVER_ERROR);
    } else {
      alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
    }
  }

  public async logout(): Promise<void> {
    try {
      const { status, response } = await authApi.logout();
      if (status === 200) {
        store.setResetState();
        router.go(Routes.AUTH);
      } else if (status === 500) {
        router.go(Routes.INTERNAL_SERVER_ERROR);
      } else {
        alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthController();
