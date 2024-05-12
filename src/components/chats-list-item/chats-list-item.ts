import Block from '../../core/block/Block.ts';
import Avatar from '../avatar/avatar.ts';
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

// language=hbs
const chatListItemTemplate = `
    <div id="{{id}}" class="chats-list-item {{#if className}} {{className}} {{/if}}">
        <div class="chats-list-item__container">
            {{{avatar}}}
            <div class="chats-list-item__content">
                <div class="chats-list-item__content-column">
                    <h3 class="chats-list-item__name">{{title}}</h3>
                    <h4 class="chats-list-item__last-message">
                        {{ lastMessage.content }}
                    </h4>
                </div>
                <div class="chats-list-item__content-column">
                    <h6 class="chats-list-item__time">
                        {{ lastMessage.time }}
                    </h6>
                    {{#if unreadCount}}
                        <h5 class="chats-list-item__unread-message">
                            {{ unreadCount }}
                        </h5>
                    {{/if}}
                </div>
            </div>
        </div>
    </div>
`;

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
