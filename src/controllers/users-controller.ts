import router, { Routes } from '../utils/Router.ts';
import usersApi from '../api/users-api.ts';
import store from '../utils/Store.ts';
import { ChangePassword, ChangeUser, Login } from '../api/types.ts';
import { ChatUser, User } from '../utils/types.ts';

class UsersController {
  public async changeData(data: ChangeUser) {
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

  public async changePassword(data: ChangePassword) {
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

  public async changeAvatar(file: FormData) {
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

  public async searchUsers(login: string) {
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
    const currentUser = users
      ? users.filter(user => user.id === userId)[0]
      : [];

    store.set('currentUser', currentUser);
  }
}

export default new UsersController();
