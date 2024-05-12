import queryStringify from '../../utils/queryStringfy.ts';

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

interface RequestOptions {
  method?: Methods;
  headers?: Record<string, string>;
  data?: Record<string, unknown> | FormData;
  timeout?: number;
}

type HTTPMethod<R = XMLHttpRequest> = (
  endpoint: string,
  options?: RequestOptions,
  timeout?: number
) => Promise<R>;

export const HOST = 'https://ya-praktikum.tech/api/v2';

export default class HTTP {
  public _path: string = '';

  constructor(path?: string | undefined) {
    if (path !== undefined) {
      this._path = path;
    }
  }

  get: HTTPMethod = (endpoint, options = {}) =>
    this.request(endpoint, { ...options, method: Methods.GET });

  post: HTTPMethod = (endpoint, options = {}) =>
    this.request(endpoint, { ...options, method: Methods.POST });

  put: HTTPMethod = (endpoint, options = {}) =>
    this.request(endpoint, { ...options, method: Methods.PUT });

  delete: HTTPMethod = (endpoint, options = {}) =>
    this.request(endpoint, { ...options, method: Methods.DELETE });

  request: HTTPMethod = (
    endpoint,
    options = { method: Methods.GET },
    timeout = 5000
  ) => {
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

      const xhr = new XMLHttpRequest();
      const isGet = method === Methods.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${HOST}${this._path}${endpoint}${queryStringify(data)}`
          : `${HOST}${this._path}${endpoint}`
      );
      xhr.withCredentials = true;

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
