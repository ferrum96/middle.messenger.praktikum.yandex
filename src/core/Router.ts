import Route from './Route.ts';
import Block from './Block.ts';
import { notFoundPage } from '../pages/404/404.ts';
import store from './Store.ts';

export enum Routes {
  AUTH = '/',
  SIGNUP = '/sign-up',
  MESSENGER = '/messenger',
  SETTINGS = '/settings',
  EDIT_PROFILE = '/edit-profile',
  EDIT_PASSWORD = '/edit-password',
  NOT_FOUND_ERROR = '/404',
  INTERNAL_SERVER_ERROR = '/500'
}

class Router {
  private static __instance: Router;
  private _routes: Route[] = [];
  private _history: History = window.history;
  private _currentRoute: Route | null = null;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  use(pathname: string, page: Block): Router {
    const route: Route = new Route(pathname, page);
    this._routes.push(route);
    return this; // чтобы можно было вызывать методы цепочкой
  }

  start(): void {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    if (store.getState().auth) {
      if (pathname === Routes.AUTH || pathname === Routes.SIGNUP) {
        pathname = Routes.MESSENGER;
        this._history.pushState({}, '', Routes.MESSENGER);
      }
    }
    if (!store.getState().auth) {
      if (pathname !== Routes.AUTH && pathname !== Routes.SIGNUP) {
        pathname = Routes.AUTH;
        this._history.pushState({}, '', Routes.AUTH);
      }
    }

    const route = this.getRoute(pathname);

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.navigate(pathname);
  }

  go(pathname: string): void {
    this._history.pushState({}, '/', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this._history.back();
  }

  forward(): void {
    this._history.forward();
  }

  getRoute(pathname: string): Route {
    const route = this._routes.find(route => route.match(pathname));

    if (route !== undefined) {
      return route;
    } else {
      return new Route(pathname, notFoundPage);
    }
  }
}

export default new Router();
