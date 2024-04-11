import EventBus from './EventBus.ts';
import set from './set.ts';
import { Chat, ChatUser, MessageProps, User } from './types.ts';

export enum StoreEvents {
  Updated = 'updated'
}

export type State = {
  auth: boolean;
  user: User | null;
  chats: Chat[] | null;
  currentChat: Chat | null;
  currentChatUsers: ChatUser[];
  searchChatUsers: User[] | null;
  isSearchChats: boolean;
  currentChatMessages: MessageProps[];
  isLoadedFile: boolean;
  fileName: string;
  formData: {};
};

function set<K extends keyof State>(
  object: State,
  path: K,
  value: State[K]
): State {
  if (path in object) {
    object[path] = value;
  }
  return object;
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
  private _state: State = {
    auth: false,
    user: null,
    chats: null,
    currentChat: null,
    currentChatUsers: [],
    isSearchChats: false,
    searchChatUsers: null,
    currentChatMessages: [],
    isLoadedFile: false,
    fileName: '',
    formData: {}
  };

  public getState(): State {
    return this._state;
  }

  public set(path: string, value: unknown) {
    set(this._state, path, value);
    this.emit(StoreEvents.Updated);
  }

  public setResetState(): void {
    try {
      this._state = {
        auth: false,
        user: null,
        chats: null,
        currentChat: null,
        currentChatUsers: [],
        searchChatUsers: null,
        formData: {},
        currentChatMessages: [],
        isSearchChats: false,
        isLoadedFile: false,
        fileName: ''
      };
      this.emit(StoreEvents.Updated);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new Store();
