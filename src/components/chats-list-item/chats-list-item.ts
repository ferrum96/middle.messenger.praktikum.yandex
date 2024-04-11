import './chats-list-item.sass';
import chatListItem from './chats-list-item.hbs?raw';
import Block from '../../utils/Block';
import Avatar from '../avatar/avatar';
import chatsController from '../../controllers/chats-controller.ts';
import { LastMessage } from '../../utils/types.ts';
// import MessageController from '../../controllers/message-controller.ts';
import { EventHandlers } from '../../utils/EventHandlers.ts';

interface ChatListItemProps {
  id: number;
  title: string;
  avatar: Avatar;
  unreadCount?: number;
  createdBy: number;
  lastMessage: LastMessage | null;
  events?: {};
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
    EventHandlers.setActiveChat(this.props.id);
    chatsController.setCurrentChat(this.props.id);
    chatsController.getChatUsers(this.props.id);

    // const messageController = new MessageController();
    //
    // messageController.disconnect();
    // messageController.connect();
  }

  render() {
    return chatListItem;
  }
}
