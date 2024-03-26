import './chat-list-item.sass';
import chatListItem from './chat-list-item.hbs?raw';
import Block from '../../utils/Block';
import Avatar from '../avatar/avatar';

interface ChatListItemProps {
  avatar: Avatar;
  name: string;
  text: string;
  time: string;
  countUnreadMessages?: number;
  selected?: boolean;
}

export default class ChatListItem extends Block<ChatListItemProps> {
  constructor(props: ChatListItemProps) {
    super({
      ...props
    });
  }

  render() {
    return chatListItem;
  }
}
