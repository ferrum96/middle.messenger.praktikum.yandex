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
  events?: {};
}

export default class ChatListItem extends Block<ChatListItemProps> {
  private static activeItem: ChatListItem | null = null;
  constructor(props: ChatListItemProps) {
    super({
      ...props,
      events: {
        click: () => this.handleItemClick()
      }
    });
  }

  handleItemClick() {
    if (ChatListItem.activeItem) {
      ChatListItem.activeItem.setActive(false);
    }

    this.setActive(true);
    ChatListItem.activeItem = this;
  }

  setActive(active: boolean) {
    const content = this.getContent();

    if (active) {
      content.classList.add(`${this.getContent().classList[0]}_active`);
    } else {
      content.classList.remove(`${this.getContent().classList[0]}_active`);
    }
  }

  render() {
    return chatListItem;
  }
}
