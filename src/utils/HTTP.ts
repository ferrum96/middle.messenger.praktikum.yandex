import queryStringify from './queryStringfy.ts';

enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export interface RequestOptions {
  method: Methods;
  headers?: Record<string, string>;
  data?: Record<string, unknown>;
  timeout?: number;
}

type OptionsWithoutMethod = Omit<RequestOptions, 'method'>;

export default class HTTP {
  private _host = 'https://ya-praktikum.tech/api/v2';
  public _path: string = '';

  constructor(path?: string | undefined) {
    if (path !== undefined) {
      this._path = path;
    }
  }

  get = <TResponse>(
    endpoint: string,
    options: OptionsWithoutMethod = {}
  ): Promise<TResponse> =>
    this.request<TResponse>(
      endpoint,
      { ...options, method: Methods.GET },
      options.timeout
    );

  post = <TResponse>(
    endpoint: string,
    options: OptionsWithoutMethod = {}
  ): Promise<TResponse> =>
    this.request<TResponse>(
      endpoint,
      { ...options, method: Methods.POST },
      options.timeout
    );

  put = <TResponse>(
    endpoint: string,
    options: OptionsWithoutMethod = {}
  ): Promise<TResponse> =>
    this.request<TResponse>(
      endpoint,
      { ...options, method: Methods.PUT },
      options.timeout
    );

  delete = <TResponse>(
    endpoint: string,
    options: OptionsWithoutMethod = {}
  ): Promise<TResponse> =>
    this.request<TResponse>(
      endpoint,
      { ...options, method: Methods.DELETE },
      options.timeout
    );

  request = <TResponse>(
    endpoint: string,
    options: RequestOptions = { method: Methods.GET },
    timeout: number = 5000
  ): Promise<TResponse> => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === Methods.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${this._host}${this._path}${endpoint}${queryStringify(data)}`
          : `${this._host}${this._path}${endpoint}`
      );

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        if (xhr.status !== 200) {
          reject(
            new Error(
              `Ошибка ${xhr.status}: ${xhr?.response?.reason || xhr.statusText}`
            )
          );
        } else {
          resolve(xhr.response);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === Methods.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
