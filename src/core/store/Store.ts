import EventBus from '../EventBus.ts';
import { Chat, ChatUser, MessageProps, User } from '../../utils/types.ts';

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
  currentUser: User | ChatUser | null | undefined;
  isLoadedFile: boolean;
  fileName: string;
  formData: {} | null;
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

  public set<K extends keyof State>(path: K, value: State[K]): void {
    set(this._state, path, value);
    this.emit(StoreEvents.Updated);
  }

  public setResetState(): void {
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
  }
}

export default new Store();
