import EventBus from './EventBus';
import Handlebars from 'handlebars';
import { v4 as uuid } from 'uuid';
import isEqual from './isEqual.ts';
import deepClone from './deepClone';

export interface Props {
  [index: string]: any;
  events?: {};
}

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render'
  } as const;

  private _element: HTMLElement | null = null;
  public readonly eventBus: () => EventBus;
  private _id: string = uuid();
  protected props: Props;
  children: Record<string, Block | Block[]> = {};

  protected constructor(propsWithChildren: Props) {
    const eventBus = new EventBus();
    const { props, children } =
      this._getChildrenPropsAndProps(propsWithChildren);

    this.props = this._makePropsProxy(props as Props);
    this.children = children;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _makePropsProxy(props: Props): Props {
    const self = this;

    return new Proxy(props, {
      get(target, key: keyof Props) {
        if ((key as string).startsWith('_')) {
          throw new Error('No access');
        }
        const value = target[key];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, key: keyof Props, value) {
        if ((key as string).startsWith('_')) {
          throw new Error('No access');
        }
        const oldTarget = deepClone(target);

        target[key] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      }
    } as ProxyHandler<Props>);
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();

    Object.values(this.children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(ch => {
          ch.dispatchComponentDidMount();
        });
      } else {
        child.dispatchComponentDidMount();
      }
    });
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  public componentDidUpdate(oldProps: Props, newProps: Props) {
    return !isEqual(oldProps, newProps);
  }

  protected _componentWillUnmount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CWU);
    console.log('componentWillUnmount');
    this.componentWillUnmount();
  }

  public componentWillUnmount() {}

  private _addEvents(): void {
    const { events = {} } = this.props as {
      events?: Record<string, EventListenerOrEventListenerObject>;
    };

    Object.keys(events).forEach(eventName => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private _removeEvents(): void {
    const { events = {} } = this.props as {
      events?: Record<string, EventListenerOrEventListenerObject>;
    };
    Object.keys(events).forEach(eventName => {
      if (this._element) {
        this._element.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  get element() {
    if (!this._element) {
      this._render();
    }

    return this._element;
  }

  private _render(): void {
    const propsAndStubs: Record<string, unknown> = { ...this.props };

    this._removeEvents();

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child
          .map(child => `<div data-id="${child._id}"></div>`)
          .join('');
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = document.createElement('template');

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach(child => {
      const stubs = Array.isArray(child) ? child : [child];
      stubs.forEach(child => {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        if (stub) {
          stub.replaceWith(child.getContent());
        }
      });
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  public getContent(): HTMLElement {
    return this.element as HTMLElement;
  }

  setProps(nextProps: Props): void {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, deepClone(nextProps));
  }

  private _getChildrenPropsAndProps(
    propsAndChildren: Record<string, unknown>
  ): {
    children: Record<string, Block | Block[]>;
    props: Record<string, unknown>;
  } {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block | Block[]> = {};

    Object.entries(propsAndChildren).forEach(([key, element]) => {
      if (Array.isArray(element)) {
        const blockArray = element.filter(
          item => item instanceof Block
        ) as Block[];
        if (blockArray.length > 0) {
          children[key] = blockArray;
        }
      } else if (element instanceof Block) {
        children[key] = element as Block;
      } else {
        props[key] = element;
      }
    });

    return { children, props };
  }

  remove(): void {
    if (this.element) {
      this.element.remove();
    }
  }

  show() {
    this.getContent()!.style.removeProperty('display'); // .display = 'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }
}
