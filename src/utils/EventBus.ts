export default class EventBus {
  listeners: Record<string, Function[]>;

  constructor() {
    this.listeners = {};
  }

  on<T extends unknown[]>(event: string, callback: (...args: T) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off<T extends unknown[]>(
    event: string,
    callback: (...args: T) => void
  ): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener: any) => listener !== callback
    );
  }

  emit<T extends unknown[]>(event: string, ...args: T): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event].forEach((listener: Function): void => {
      listener(...args);
    });
  }
}
