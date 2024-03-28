import EventBus from './EventBus';
import Handlebars from 'handlebars';
import { v4 as uuid } from 'uuid';
import { isDeepEqual } from './object.ts';

export default abstract class Block<Props extends Record<string, any> = {}> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  } as const;

  private _element: HTMLElement | null = null;
  public readonly eventBus: () => EventBus;
  private _id: string = uuid();
  protected props: Props;
  protected children: Record<string, Block | Block[]> = {};

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

  _makePropsProxy(props: Props): Props {
    const self = this;

    return new Proxy(props, {
      get(target, key: keyof Props) {
        if (typeof key === 'string' && (key as string).startsWith('_')) {
          throw new Error('No access');
        }
        const value = target[key];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, key: keyof Props, value) {
        if (typeof key === 'string' && (key as string).startsWith('_')) {
          throw new Error('No access');
        }
        const oldTarget = { ...target };

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
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    console.log('componentDidMount()');

    Object.values(this.children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(ch => {
          ch.dispatchComponentDidMount();
        });
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  componentDidMount(): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    console.log('_componentDidUpdate');
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  public componentDidUpdate(oldProps: Props, newProps: Props) {
    return isDeepEqual(oldProps, newProps);
  }

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
        stub?.replaceWith(child.getContent());
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

    Object.assign(this.props, nextProps);
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

  show(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'block';
    }
  }

  hide(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }
}
