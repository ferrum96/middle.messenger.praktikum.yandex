import './chats-list-item.sass';
import chatListItemTemplate from './chats-list-item.hbs?raw';
import Block from '../../core/Block.ts';
import Avatar from '../avatar/avatar';
import chatsController from '../../controllers/chats-controller.ts';
import { LastMessage } from '../../utils/types.ts';
import { EventHandlers } from '../../utils/EventHandlers.ts';

interface ChatListItemProps {
  className?: string;
  id: number;
  title: string;
  avatar: Avatar;
  unreadCount?: number;
  createdBy: number;
  lastMessage: LastMessage | null;
}

export default class ChatsListItem extends Block {
  constructor(props: ChatListItemProps) {
    super({
      ...props,
      events: {
        click: () => this._setCurrentChat()
      }
    });
  }

  private _setCurrentChat() {
    EventHandlers.setActiveItem(this.props.id, '.chats-list-item');
    chatsController.setCurrentChat(this.props.id);
    chatsController.getChatUsers(this.props.id);
  }

  render() {
    return chatListItemTemplate;
  }
}
