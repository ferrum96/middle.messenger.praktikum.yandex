import Socket, { Message, WebSocketProps } from '../utils/Socket.ts';
import store from '../utils/Store.ts';
import { DataToken, MessageProps } from '../utils/types.ts';
import chatsApi from '../api/chats-api.ts';
import { transformToLastMessage } from '../utils/apiTransformers.ts';
import usersController from './users-controller.ts';
import chatsController from './chats-controller.ts';
import { EventHandlers } from '../utils/EventHandlers.ts';

export default class MessageController {
  static __instance: MessageController | undefined;

  protected socket: Socket | null = null;

  protected socketProps: WebSocketProps = {
    userId: 0,
    chatId: 0,
    token: '',
    callbackMessages: (data: MessageProps | MessageProps[]) => {
      this.addMessage(data);
    }
  };

  constructor() {
    if (MessageController.__instance) {
      return MessageController.__instance;
    }

    MessageController.__instance = this;
  }

  async getUserToken(chatId: number): Promise<string> {
    const { response } = await chatsApi.getUserToken(chatId);

    return JSON.parse(response).token;
  }

  async connect() {
    const { user, currentChat } = store.getState();
    if (user && currentChat) {
      this.socketProps.userId = user.id;
      this.socketProps.chatId = currentChat.id;

      this.socketProps.token = await this.getUserToken(currentChat.id);

      this.socket = new Socket(this.socketProps);
    }
  }

  disconnect() {
    this.socket?.closeConnect();
  }

  sendMessage(mess: Message) {
    this.socket?.send(mess);
  }

  async addMessage(message: MessageProps | MessageProps[]) {
    const { currentChatMessages, currentChat } = store.getState();
    let newChatMessages: MessageProps[] = [];

    if (Array.isArray(message)) {
      newChatMessages = [...message].reverse();
    } else {
      newChatMessages = [...currentChatMessages, message];
    }

    store.set('currentChatMessages', newChatMessages);

    const chatMessages = document.querySelector('.chats-dialog__content');
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}
