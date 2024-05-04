export type Indexed<T = any> = {
  [key in string]: T;
};

export type PlainObject<T = any> = {
  [k in string]: T;
};

export type StringIndexed = Record<string, any>;

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

export type UserDTCO = Omit<User, 'phone' | 'email'> & {
  role: string;
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
