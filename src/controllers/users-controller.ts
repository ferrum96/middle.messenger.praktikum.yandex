import router, { Routes } from '../utils/Router.ts';
import usersApi from '../api/users-api.ts';
import store from '../utils/Store.ts';
import Block from '../utils/Block.ts';
import { ChangePassword, ChangeUser, Login } from '../api/types.ts';

class UsersController {
  public async changeData(data: ChangeUser) {
    try {
      const { status, response } = await usersApi.changeData(data);

      if (status === 200) {
        alert('Изменения в внесены в профиль!');
        store.set('user', JSON.parse(response));
        router.go(Routes.PROFILE);
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
        router.go(Routes.PROFILE);
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

      if (status === 200) {
        store.set('user', JSON.parse(response));
        alert('Аватар изменен!');
        router.go(Routes.PROFILE);
      } else if (status === 500) {
        router.go(Routes.INTERNAL_SERVER_ERROR);
      } else {
        alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async searchUsers(self: Block, value: Login) {
    if (!value) {
      self.setProps({ items: null });
      return;
    }

    try {
      const { status, response } = await usersApi.searchUser(value);

      if (status === 200) {
        self.setProps({ items: JSON.parse(response) });
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

export default new UsersController();
