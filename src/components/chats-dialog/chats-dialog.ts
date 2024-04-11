import chatsDialogTemplate from './chats-dialog.hbs?raw';
import './chats-dialog.sass';
import Block, { Props } from '../../utils/Block.ts';
import Input from '../input/input.ts';
import Avatar from '../avatar/avatar.ts';
import Button from '../button/button.ts';
import MessagesContainer from '../messages-container/messages-container.ts';
import MenuWindow from '../menu-window/menu-window.ts';
import MenuItem from '../menu-item/menu-item.ts';
import Message from '../message/message.ts';
import { hoc } from '../../utils/hoc.ts';
import { buildPathToResource } from '../../utils/buildPathToResource.ts';
import ChatsDialogHeader from '../chats-dialog-header/chats-dialog-header.ts';

interface ChatsDialogProps {
  chatsDialogHeader?: ChatsDialogHeader;
  uploadButton: Button;
  chatMessages?: Message[];
  sendMessageInput: Input;
  sendMessageButton: Button;
}

export default class ChatsDialog extends Block {
  constructor() {
    const props: ChatsDialogProps = {
      uploadButton: new Button({
        className: 'chats-dialog__upload-button',
        icon: '/icons/Upload-menu.jpg',
        menu: new MenuWindow({
          className: 'chats-dialog__file-settings',
          menuItems: [
            new MenuItem({
              icon: 'icons/Upload-photo.svg',
              title: 'Фото или Видео'
            }),
            new MenuItem({
              icon: 'icons/Upload-file.svg',
              title: 'Файл'
            }),
            new MenuItem({
              icon: 'icons/Location.svg',
              title: 'Локация'
            })
          ]
        })
      }),
      sendMessageInput: new Input({
        name: 'sendMessage',
        className: 'chats-dialog__send-message',
        placeholder: 'Сообщение'
      }),
      sendMessageButton: new Button({
        className: 'button_round',
        icon: '/icons/Right-arrow.svg'
      })
    };
    super(props);
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    const currentChat = newProps.currentChat;

    this.children.chatsDialogHeader = new ChatsDialogHeader({
      avatar: new Avatar({
        className: 'chats-list-item__avatar',
        src: currentChat.avatar
          ? buildPathToResource(currentChat.avatar)
          : '/icons/Default-avatar.svg',
        alt: currentChat.avatar ? `${currentChat.id}` : 'default-avatar'
      }),
      title: currentChat.title
    });

    this.children.chatMessages = [
      new MessagesContainer({
        date: '19 июня',
        messagesList: [
          new Message({
            className: 'message_from',
            content: `${currentChat.title}: ${currentChat.id}`,
            time: '11:56'
          }),
          new Message({
            className: 'message_to',
            content: `${currentChat.title}: ${currentChat.id}`,
            time: '12:56'
          })
        ]
      })
    ];

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return chatsDialogTemplate;
  }
}

export const chatsDialog = hoc(state => ({
  currentChat: state.currentChat,
  currentChatUsers: state.currentChatUsers
}))(ChatsDialog);
