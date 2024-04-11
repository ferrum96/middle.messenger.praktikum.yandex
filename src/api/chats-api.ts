import HTTP from '../utils/HTTP.ts';
import { ChatData, CreateChat, DataAddingUsersToChat } from './types.ts';

class ChatApi {
  private _chatApiInstance: HTTP = new HTTP('/chats');

  public async getChats(): Promise<XMLHttpRequest> {
    return this._chatApiInstance.get('/');
  }

  public async createChat(data: CreateChat): Promise<XMLHttpRequest> {
    return this._chatApiInstance.post('/', {
      data,
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });
  }

  public async deleteChatById(data: ChatData): Promise<XMLHttpRequest> {
    return this._chatApiInstance.delete('/', { data });
  }

  public async getChatSentFiles(id: number): Promise<XMLHttpRequest> {
    return this._chatApiInstance.get(`/${id}/files`);
  }

  public async getChatUsers(id: number): Promise<XMLHttpRequest> {
    return this._chatApiInstance.get(`/${id}/users`);
  }

  public async addUserToChat(
    data: DataAddingUsersToChat
  ): Promise<XMLHttpRequest> {
    return this._chatApiInstance.put('/users', { data });
  }

  public async deleteUserToChat(
    data: DataAddingUsersToChat
  ): Promise<XMLHttpRequest> {
    return this._chatApiInstance.delete('/users', { data });
  }

  public async getUserToken(chatId: number): Promise<XMLHttpRequest> {
    return this._chatApiInstance.post(`/token/${chatId}`);
  }
}

export default new ChatApi();
