import router, { Routes } from '../core/router/Router.ts';
import usersApi from '../api/users-api.ts';
import store from '../core/store/Store.ts';
import { ChangePassword, ChangeUser, Login } from '../api/types.ts';
import { ChatUser, User, UserDTCO } from '../utils/types.ts';

class UsersController {
  public async changeData(data: ChangeUser): Promise<void> {
    try {
      const { status, response } = await usersApi.changeData(data);

      if (status === 200) {
        alert('Изменения в внесены в профиль!');
        store.set('user', JSON.parse(response));
        router.go(Routes.SETTINGS);
      } else if (status === 500) {
        router.go(Routes.INTERNAL_SERVER_ERROR);
      } else {
        alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async changePassword(data: ChangePassword): Promise<void> {
    try {
      const { status, response } = await usersApi.changePassword(data);

      if (status === 200) {
        alert('Пароль изменен!');
        router.go(Routes.SETTINGS);
      } else if (status === 500) {
        router.go(Routes.INTERNAL_SERVER_ERROR);
      } else {
        alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async changeAvatar(file: FormData): Promise<void> {
    try {
      const { status, response } = await usersApi.changeAvatar(file);
      store.set('formData', null);
      store.set('formData', {});

      if (status === 200) {
        store.set('user', JSON.parse(response));
        alert('Аватар изменен!');
        router.go(Routes.SETTINGS);
      } else if (status === 500) {
        router.go(Routes.INTERNAL_SERVER_ERROR);
      } else {
        alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async searchUsers(login: string): Promise<void> {
    try {
      const { status, response } = await usersApi.searchUser({
        login
      } as Login);

      if (status === 200) {
        store.set('searchingUsers', JSON.parse(response));
      } else if (status === 500) {
        router.go(Routes.INTERNAL_SERVER_ERROR);
      } else {
        alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async setCurrentUser(userId: number): Promise<void> {
    const users: User[] | ChatUser[] | null | undefined = store.getState()
      .isSearchingUsers
      ? store?.getState()?.searchingUsers
      : store.getState().currentChatUsers;
    const currentUser: User | ChatUser | undefined | null =
      users !== null ? users.find(user => user.id === userId) : null;

    store.set('currentUser', currentUser);
  }

  public getUserById(id: number): UserDTCO | undefined {
    const { currentChatUsers } = store.getState();
    const findUser = currentChatUsers
      ? currentChatUsers.find((user: ChatUser) => user.id === id)
      : undefined;

    return findUser as UserDTCO | undefined;
  }

  public itMe(id: number): boolean | undefined {
    const userById = this.getUserById(id);
    const { user } = store.getState();
    if (userById && user) {
      return userById.id === user.id;
    }
    return undefined;
  }

  public getAvatar(id: number): string | null | undefined {
    const userById = this.getUserById(id);
    return userById?.avatar;
  }
}

export default new UsersController();
