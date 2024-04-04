import './chat-list.sass';
import chatList from './chat-list.hbs?raw';
import Block from '../../utils/Block';
import Link from '../link/link';
import ChatListItem from '../chat-list-item/chat-list-item';
import Input from '../input/input.ts';

interface ChatListProps {
  profileLink?: Link;
  searchInput?: Input;
  chatListItem: ChatListItem[];
}

const profileLink = new Link({
    className: 'chat-list__profile-link',
    text: 'Профиль >',
    page: '/profile'
  }),
  searchInput = new Input({
    className: 'chat-list__search-input',
    name: 'search',
    placeholder: 'Поиск'
  });

export default class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super({
      profileLink,
      searchInput,
      ...props
    });
  }

  render() {
    return chatList;
  }
}
