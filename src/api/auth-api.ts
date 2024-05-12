import HTTP from '../core/http/HTTP.ts';
import { CreateUser, LoginRequestData } from './types.ts';

class AuthApi {
  private _authApiInstance = new HTTP('/auth');

  public async signIn(data: LoginRequestData): Promise<XMLHttpRequest> {
    return this._authApiInstance.post('/signin', {
      data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  }

  public async signUp(data: CreateUser): Promise<XMLHttpRequest> {
    return this._authApiInstance.post('/signup', {
      data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  }

  public async user(): Promise<XMLHttpRequest> {
    return this._authApiInstance.get('/user');
  }

  public async logout(): Promise<XMLHttpRequest> {
    return this._authApiInstance.post('/logout');
  }
}

export default new AuthApi();
