import './chats-list.sass';
import chatListTemplate from './chats-list.hbs?raw';
import Block, { Props } from '../../utils/Block';
import Link from '../link/link';
import ChatsListItem from '../chats-list-item/chats-list-item.ts';
import Input from '../input/input.ts';
import { hoc } from '../../utils/hoc.ts';
import { Chat, LastMessage } from '../../utils/types.ts';
import Avatar from '../avatar/avatar.ts';
import { buildPathToResource } from '../../utils/buildPathToResource.ts';
import getTimeFromDate from '../../utils/getTimeFromDate.ts';
import Button from '../button/button.ts';
import ModalWindow from '../modal-window/modal-window.ts';
import InputField from '../input-field/input-field.ts';
import { EventHandlers } from '../../utils/EventHandlers.ts';
import chatsController from '../../controllers/chats-controller.ts';

interface ChatsListProps {
  profileLink: Link;
  searchInput: Input;
  addChatButton: Button;
  chatListItems?: ChatsListItem[];
  modalWindow?: ModalWindow;
}

export default class ChatsList extends Block {
  constructor() {
    const props: ChatsListProps = {
      profileLink: new Link({
        className: 'chat-list__profile-link',
        text: 'Профиль >',
        page: '/settings'
      }),
      searchInput: new Input({
        className: 'chat-list__search-input',
        name: 'search',
        placeholder: 'Поиск'
      }),
      addChatButton: new Button({
        className: 'chat-list__add-chat-button',
        text: 'Новый чат',
        onClick: () => {
          EventHandlers.setModalWindowActive('.modal-window_create-chat');
        }
      })
    };

    super(props);
  }

  componentDidMount() {
    this.children.modalWindow = new ModalWindow({
      className: 'modal-window_create-chat',
      title: 'Введите имя чата',
      content: [
        new InputField({
          className: 'form__input-field',
          title: 'Название чата',
          input: new Input({
            type: 'text',
            name: 'new_chat',
            placeholder: 'Введите название чата'
          })
        })
      ],
      actionButton: new Button({
        className: 'modal-window__action-button',
        text: ' Создать чат',
        onClick: () => {
          const modalWindow = (
            this.children instanceof Array ? this.children[0] : this.children
          )?.modalWindow;
          const newChatInput = modalWindow?.children?.content[0]?.children
            ?.input as Input;

          if (newChatInput.value === '') {
            alert('Название не может быть пустое');
          } else {
            chatsController.createChat(newChatInput.value);
          }
        }
      })
    });

    super.componentDidMount();
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    const chats: Chat[] = newProps.chats;

    this.children.chatListItems = chats.map(chat => {
      const { id, title, avatar, unread_count, created_by, last_message } =
        chat;
      return new ChatsListItem({
        id,
        title,
        avatar: new Avatar({
          className: 'chats-list-item__avatar',
          src: avatar
            ? buildPathToResource(avatar)
            : '/icons/Default-avatar.svg',
          alt: avatar ? `${id}` : 'default-avatar'
        }),
        unreadCount: unread_count,
        createdBy: created_by,
        lastMessage: {
          ...last_message,
          time: getTimeFromDate(last_message?.time)
        } as LastMessage
      });
    });

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return chatListTemplate;
  }
}

export const chatList = hoc(state => ({
  chats: state.chats
}))(ChatsList);
