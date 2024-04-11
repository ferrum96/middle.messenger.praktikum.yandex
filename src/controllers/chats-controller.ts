// import MessageController from './MessageController';

import router, { Routes } from '../utils/Router.ts';
import chatsApi from '../api/chats-api.ts';
import store from '../utils/Store.ts';
import { Chat, UserDTCO } from '../utils/types.ts';
import { CreateChat } from '../api/types.ts';
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
        router.go(Routes.CHATS);
        EventHandlers.setActiveChat(JSON.parse(response).id);
      } else if (status === 500) {
        router.go(Routes.INTERNAL_SERVER_ERROR);
      } else {
        alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
      }
    } catch (e) {
      console.log(e);
    }
  }

  //
  // public async deleteChats(): Promise<void> {
  //   try {
  //     const chatId = store.getState().currentChat.chat.id;
  //     if (typeof chatId !== 'number') return;
  //     const { status, response } = await ChatsApi.deleteChat({ chatId });
  //     if (status === 200) {
  //       this.getChats();
  //       this.store.set('currentChat', {
  //         isLoading: false,
  //         isLoadingOldMsg: false,
  //         scroll: 0,
  //         chat: null,
  //         messages: null
  //       });
  //     } else if (status === 500) {
  //       this.router.go('/500');
  //     } else {
  //       alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  //
  // public async addUser(id: number, user: number): Promise<boolean> {
  //   if (!id || !user) return false;
  //   try {
  //     const { status, response } = await ChatsApi.addUsers(id, [user]);
  //     if (status === 200) {
  //       return true;
  //     }
  //     if (status === 500) {
  //       this.router.go('/500');
  //       return false;
  //     }
  //     alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
  //     return false;
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   return false;
  // }
  //
  // public async addNewChatUser(
  //   user: Record<string, string | number>
  // ): Promise<boolean | void> {
  //   const { display_name, login, id } = user;
  //   let chat = this?.store?.getState()?.currentChat?.chat?.id;
  //   if (
  //     !confirm(
  //       `Вы хотите ${chat ? 'добавить в текущий чат ' : 'создать новый чат с '}${login}`
  //     )
  //   ) {
  //     return;
  //   }
  //   if (!chat) {
  //     const title = display_name ?? login;
  //     chat = await this.createChat(String(title));
  //     return;
  //   }
  //   if (!chat) return;
  //   const result = await this.addUser(Number(chat), Number(id));
  //   // eslint-disable-next-line consistent-return
  //   return result;
  // }
}

export default new ChatsController();
