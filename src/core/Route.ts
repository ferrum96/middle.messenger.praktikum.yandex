import Block from './Block.ts';
import { renderDOM } from '../utils/renderDOM.ts';

export default class Route {
  private _pathname: string;
  private readonly _page: Block;

  constructor(pathname: string, page: Block) {
    this._pathname = pathname;
    this._page = page;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._page) {
      this._page.remove();
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  render(): void {
    renderDOM('#app', this._page as unknown as Block);
  }
}
