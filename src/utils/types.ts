export type Indexed<T = any> = {
  [key in string]: T;
};

export type PlainObject<T = any> = {
  [k in string]: T;
};

export type StringIndexed = Record<string, any>;

export type SignUpResponse = {
  id: number;
};

export type User = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string | null;
  avatar: string | null;
  phone: string;
  email: string;
  reason?: string;
  role?: string;
};

export type ChatUser = Omit<User, 'phone' | 'email'>;

export type DataToken = {
  token: string;
};

export type DeleteChat = {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
    created_by: number;
  };
};

export type UserDTCO = Omit<User, 'phone' | 'email'> & {
  role: string;
};

export type CreateUser = Omit<User, 'avatar' | 'display_name' | 'id'> & {
  password: string;
};

export type ChangeUser = Omit<User, 'avatar' | 'id'>;

export type ChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type CreateChat = {
  title: string;
};

export type LoginRequestData = {
  login: string;
  password: string;
};

export type LastMessage = {
  id: number;
  user: ChatUser;
  time: string;
  content: string;
};

export type Chat = {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  last_message: LastMessage | null;
};

export type MessageProps = {
  content: string;
  time: string;
  user_id: number;
  type: string;
};
