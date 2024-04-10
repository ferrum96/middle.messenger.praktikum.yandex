import EventBus from './EventBus.ts';
import set from './set.ts';
import ChatListItem from '../components/chat-list-item/chat-list-item.ts';
import ChatsPage from '../pages/chats/chats.ts';

export enum StoreEvents {
  Updated = 'updated'
}

export type State = {
  auth: boolean;
  user: null | Record<string, string | number>;
  isLoading: false;
  getPage: string;
  chats: Array<ChatListItem>;
  currentChat: {
    isLoading: boolean;
    isLoadingOldMsg: boolean;
    scroll: number;
    chat: null | ChatsPage;
    messages: Array<ChatListItem> | null;
  };
};

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
  private _state: State = {
    auth: false,
    user: null,
    isLoading: false,
    getPage: '/',
    chats: [],
    currentChat: {
      isLoading: false,
      isLoadingOldMsg: false,
      scroll: 0,
      chat: null,
      messages: null
    }
  };

  public getState(): State {
    console.log(this._state);
    return this._state;
  }

  public set(path: string, value: unknown): void {
    set(this._state, path, value);
    this.emit(StoreEvents.Updated);
  }

  public setResetState(): void {
    try {
      this._state = {
        auth: false,
        user: null,
        isLoading: false,
        getPage: '/',
        chats: [],
        currentChat: {
          isLoading: false,
          isLoadingOldMsg: false,
          scroll: 0,
          chat: null,
          messages: null
        }
      };
      this.emit(StoreEvents.Updated);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new Store();
