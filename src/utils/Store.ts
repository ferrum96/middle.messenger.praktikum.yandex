import EventBus from './EventBus.ts';
import { Chat, ChatUser, MessageProps, User } from './types.ts';

export enum StoreEvents {
  Updated = 'updated'
}

export type State = {
  auth: boolean;
  user: User | null;
  chats: Chat[] | null;
  currentChat: Chat | null;
  currentChatUsers: ChatUser[] | null;
  currentChatMessages: MessageProps[];
  searchingUsers: User[] | null;
  currentUser: User | null;
  isLoadedFile: boolean;
  fileName: string;
  formData: {};
  searchingLogin: string | null;
  isSearchingUsers: boolean;
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
    currentChatUsers: null,
    searchingUsers: null,
    currentUser: null,
    currentChatMessages: [],
    isLoadedFile: false,
    fileName: '',
    formData: {},
    searchingLogin: null,
    isSearchingUsers: false
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
        searchingUsers: null,
        currentUser: null,
        formData: {},
        currentChatMessages: [],
        isLoadedFile: false,
        fileName: '',
        searchingLogin: null,
        isSearchingUsers: false
      };
      this.emit(StoreEvents.Updated);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new Store();
