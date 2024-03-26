import './chat-list.sass';
import chatList from './chat-list.hbs?raw';
import Input from '../input/input';
import Block from '../../utils/Block';
import Link from '../link/link';
import ChatListItem from '../chat-list-item/chat-list-item';

interface ChatListProps {
  profileLink?: Link;
  searchInput?: Input;
  chatListItem: ChatListItem[];
}

export default class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super({
      profileLink: new Link({
        className: 'chat-list__profile-link',
        text: 'Профиль >',
        page: '/profile'
      }),
      searchInput: new Input({
        className: 'chat-list__search-items',
        name: 'search',
        placeholder: 'Поиск'
      }),
      ...props
    });
  }

  render() {
    return chatList;
  }
}
