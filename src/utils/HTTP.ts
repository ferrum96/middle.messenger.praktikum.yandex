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
  data?: Record<string, unknown> | FormData;
  timeout?: number;
}

type OptionsWithoutMethod = Omit<RequestOptions, 'method'>;

export const HOST = 'https://ya-praktikum.tech/api/v2';

export default class HTTP {
  public _path: string = '';

  constructor(path?: string | undefined) {
    if (path !== undefined) {
      this._path = path;
    }
  }

  get = (
    endpoint: string,
    options: OptionsWithoutMethod = {}
  ): Promise<XMLHttpRequest> =>
    this.request(
      endpoint,
      { ...options, method: Methods.GET },
      options.timeout
    );

  post = (
    endpoint: string,
    options: OptionsWithoutMethod = {}
  ): Promise<XMLHttpRequest> =>
    this.request(
      endpoint,
      { ...options, method: Methods.POST },
      options.timeout
    );

  put = (
    endpoint: string,
    options: OptionsWithoutMethod = {}
  ): Promise<XMLHttpRequest> =>
    this.request(
      endpoint,
      { ...options, method: Methods.PUT },
      options.timeout
    );

  delete = (
    endpoint: string,
    options: OptionsWithoutMethod = {}
  ): Promise<XMLHttpRequest> =>
    this.request(
      endpoint,
      { ...options, method: Methods.DELETE },
      options.timeout
    );

  request = (
    endpoint: string,
    options: RequestOptions = { method: Methods.GET },
    timeout: number = 5000
  ): Promise<XMLHttpRequest> => {
    const {
      headers = {
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      },
      method,
      data
    } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr: XMLHttpRequest = new XMLHttpRequest();
      const isGet = method === Methods.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${HOST}${this._path}${endpoint}${queryStringify(data)}`
          : `${HOST}${this._path}${endpoint}`
      );
      xhr.withCredentials = true;

      // if (data instanceof FormData) {
      //   // xhr.setRequestHeader('Accept', 'application/json');
      // } else {
      //   xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      // }

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === Methods.GET || !data) {
        xhr.send(JSON.stringify(data));
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
