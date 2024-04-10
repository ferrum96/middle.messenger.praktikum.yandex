import router from '../utils/Router.ts';
import { CreateUser, LoginRequestData } from '../utils/types.ts';
import authApi from '../api/auth-api.ts';
import store from '../utils/Store.ts';

class AuthController {
  public async createUser(data: CreateUser): Promise<void> {
    try {
      const { status, response } = await authApi.signUp(data);
      console.log(status);
      console.log(response);
      if (status === 200) {
        await this.getUserInfo();
        router.go('/chats');
      } else if (status === 500) {
        router.go('/500');
      } else {
        alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async login(data: LoginRequestData): Promise<void> {
    try {
      store.set('isLoading', true);
      const { status, response } = await authApi.signIn(data);
      if (status === 200 || response.reason === 'User already in system') {
        store.set('auth', true);
        router.go('/chats');
        await this.getUserInfo();
        store.set('isLoading', false);
      } else if (status === 500) {
        router.go('/500');
      } else {
        alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async getUserInfo(): Promise<boolean> {
    try {
      const { status, response } = await authApi.user();
      if (status === 200 && response) {
        store.set('user', JSON.parse(response));
        store.set('auth', true);
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public async logout(): Promise<void> {
    try {
      const { status, response } = await authApi.logout();
      if (status === 200) {
        store.setResetState();
        router.go('/');
      } else if (status === 500) {
        router.go('/500');
      } else {
        alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthController();
