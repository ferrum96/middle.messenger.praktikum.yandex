import { CreateUser, LoginRequestData } from '../utils/types.ts';
import HTTP from '../utils/HTTP.ts';

class AuthApi {
  private _authAPIInstance = new HTTP('/auth');

  public async signIn(data: LoginRequestData): Promise<XMLHttpRequest> {
    return await this._authAPIInstance.post('/signin', {
      data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  }

  public async signUp(data: CreateUser): Promise<XMLHttpRequest> {
    return await this._authAPIInstance.post('/signup', {
      data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  }

  async user(): Promise<XMLHttpRequest> {
    return await this._authAPIInstance.get('/user');
  }

  async logout(): Promise<XMLHttpRequest> {
    return await this._authAPIInstance.post('/logout');
  }
}

export default new AuthApi();
