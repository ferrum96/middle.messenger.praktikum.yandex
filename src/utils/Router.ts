import Route from './Route.ts';
import Block from './Block.ts';
import NotFoundPage from '../pages/404/404.ts';

export default class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | null = null;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  use(pathname: string, page: Block): Router {
    const route: Route = new Route(pathname, page);
    this.routes.push(route);
    return this; // чтобы можно было вызывать методы цепочкой
  }

  start(): void {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.navigate(pathname);
  }

  go(pathname: string): void {
    this.history.pushState({}, '/login', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): Route {
    const route = this.routes.find(route => route.match(pathname));
    if (route !== undefined) {
      return route;
    } else {
      return new Route(pathname, new NotFoundPage());
    }
  }
}
