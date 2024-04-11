import { UserDTO } from '../utils/types.ts';

export type LoginRequestData = {
  login: string;
  password: string;
};

export type CreateUser = Omit<UserDTO, 'avatar' | 'display_name' | 'id'> & {
  password: string;
};

export type CreateChat = {
  title: string;
};

export type ChatData = {
  chatId: number;
};

export type DataAddingUsersToChat = {
  users: number[];
  chatId: number;
};

export type ChangeUser = Omit<UserDTO, 'avatar' | 'id'>;

export type ChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type Login = {
  login: string;
};
