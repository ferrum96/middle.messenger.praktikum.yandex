import HTTP from '../core/http/HTTP.ts';
import { ChangePassword, ChangeUser, Login } from './types.ts';

class UsersApi {
  private _userApiInstance = new HTTP('/user');

  public async changeData(data: ChangeUser): Promise<XMLHttpRequest> {
    return this._userApiInstance.put('/profile', {
      data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  }

  public async changeAvatar(data: FormData): Promise<XMLHttpRequest> {
    return this._userApiInstance.put('/profile/avatar', {
      data
    });
  }

  public async changePassword(data: ChangePassword): Promise<XMLHttpRequest> {
    return this._userApiInstance.put('/password', {
      data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  }

  public async searchUser(data: Login): Promise<XMLHttpRequest> {
    return this._userApiInstance.post('/search', {
      data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  }
}
export default new UsersApi();
