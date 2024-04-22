// import MessageController from './MessageController';

import router, { Routes } from '../utils/Router.ts';
import chatsApi from '../api/chats-api.ts';
import store from '../utils/Store.ts';
import { Chat, UserDTCO } from '../utils/types.ts';
import { ChatData, CreateChat, DataAddingUsersToChat } from '../api/types.ts';
import { EventHandlers } from '../utils/EventHandlers.ts';

class ChatsController {
  public async getChats(): Promise<void> {
    try {
      const { status, response } = await chatsApi.getChats();

      if (status === 200) {
        store.set('chats', JSON.parse(response) as Chat[]);
      } else if (status === 401) {
        store.set('chats', []);
      } else if (status === 500) {
        router.go(Routes.INTERNAL_SERVER_ERROR);
      } else {
        alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async getChatUsers(id: number): Promise<void> {
    try {
      const { status, response } = await chatsApi.getChatUsers(id);

      if (status === 200) {
        store.set('currentChatUsers', JSON.parse(response) as UserDTCO);
      } else if (status === 400) {
        store.set('currentChatUsers', null);
      } else if (status === 500) {
        router.go(Routes.INTERNAL_SERVER_ERROR);
      } else {
        alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async getToken(chatId: number): Promise<void> {
    return chatsApi.getUserToken(chatId).then(resp => {
      return JSON.parse(resp.response);
    });
  }

  public async setCurrentChat(chatId: number): Promise<void> {
    const chats: Chat[] | null | undefined = store?.getState()?.chats;
    const currentChat = chats
      ? chats.filter(chat => chat.id === chatId)[0]
      : [];

    store.set('currentChat', currentChat);
  }

  public async createChat(title: string): Promise<void> {
    try {
      const data = { title } as CreateChat;
      const { status, response } = await chatsApi.createChat(data);

      if (status === 200) {
        await this.getChats();
        await this.setCurrentChat(JSON.parse(response).id);
        await this.getChatUsers(JSON.parse(response).id);
        router.go(Routes.MESSENGER);
        EventHandlers.setActiveItem(
          JSON.parse(response).id,
          '.chats-list-item'
        );
      } else if (status === 500) {
        router.go(Routes.INTERNAL_SERVER_ERROR);
      } else {
        alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async deleteCurrentChat(): Promise<void> {
    try {
      const chatId = store.getState().currentChat?.id;
      const confirmDelete = confirm('Уверены, что хотите удалить чат?');

      if (!confirmDelete) {
        return;
      }

      const { status, response } = await chatsApi.deleteChatById({
        chatId
      } as ChatData);

      if (status === 200) {
        await this.getChats();
        store.set('currentChat', null);
      } else if (status === 500) {
        router.go(Routes.INTERNAL_SERVER_ERROR);
      } else {
        alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async addUserToChat(chatId: number, userId: number): Promise<void> {
    try {
      const { status, response } = await chatsApi.addUserToChat({
        users: [userId],
        chatId
      } as DataAddingUsersToChat);

      if (status === 200) {
        alert('Пользователь успешно добавлен!');
        await this.getChatUsers(chatId);
        router.go(Routes.MESSENGER);
        EventHandlers.setActiveItem(chatId, '.chats-list-item');
      } else if (status === 500) {
        router.go(Routes.INTERNAL_SERVER_ERROR);
      } else {
        alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async deleteUserFromChat(
    chatId: number,
    userId: number
  ): Promise<void> {
    try {
      const { status, response } = await chatsApi.deleteUserFromChat({
        users: [userId],
        chatId
      } as DataAddingUsersToChat);

      if (status === 200) {
        alert('Пользователь успешно удалён!');
        await this.getChatUsers(chatId);
        router.go(Routes.MESSENGER);
        if (store.getState().currentChatUsers === null) {
          await this.getChats();
          store.set('currentChat', null);
        } else {
          EventHandlers.setActiveItem(chatId, '.chats-list-item');
        }
      } else if (status === 500) {
        router.go(Routes.INTERNAL_SERVER_ERROR);
      } else {
        alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default new ChatsController();
