import chatsDialogFooterTemplate from './chats-dialog-footer.hbs?raw';
import './chats-dialog-footer.sass';
import Block from '../../utils/Block.ts';
import Button from '../button/button.ts';
import MenuWindow from '../menu-window/menu-window.ts';
import MenuItem from '../menu-item/menu-item.ts';
import Input from '../input/input.ts';
import chatsController from '../../controllers/chats-controller.ts';

interface ChatsDialogFooterProps {
  uploadButton: Button;
  uploadMenu: MenuWindow;
  sendMessageInput: Input;
  sendMessageButton: Button;
  events?: {};
}

export default class ChatsDialogFooter extends Block {
  constructor() {
    const props: ChatsDialogFooterProps = {
      uploadButton: new Button({
        className: 'chats-dialog-footer__upload-button',
        icon: '/icons/Upload-menu.jpg',
        onClick: () => {}
      }),
      uploadMenu: new MenuWindow({
        className: 'chats-dialog-footer__file-settings',
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
      }),
      sendMessageInput: new Input({
        name: 'sendMessage',
        className: 'chats-dialog-footer__send-message',
        placeholder: 'Сообщение',
        onKeyDown: (event: KeyboardEvent) => {
          if (event.key === 'Enter') {
            this._send();
          }
        }
      }),
      sendMessageButton: new Button({
        className: 'button_round',
        icon: '/icons/Right-arrow.svg',
        onClick: () => this._send()
      })
    };
    super(props);
  }

  private _send() {
    const sendMessageInput = this.children.sendMessageInput as Input;
    const value = sendMessageInput.value || '';

    if (value) {
      chatsController.sendTextMessage(value);
      sendMessageInput.clearInput();
    }
  }

  render() {
    return chatsDialogFooterTemplate;
  }
}
