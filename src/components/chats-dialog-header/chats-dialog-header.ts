import chatsDialogHeaderTemplate from './chats-dialog-header.hbs?raw';
import './chats-dialog-header.sass';
import Block from '../../utils/Block.ts';
import Avatar from '../avatar/avatar.ts';
import Button from '../button/button.ts';
import MenuWindow from '../menu-window/menu-window.ts';
import MenuItem from '../menu-item/menu-item.ts';
import chatsController from '../../controllers/chats-controller.ts';
import { EventHandlers } from '../../utils/EventHandlers.ts';
import store from '../../utils/Store.ts';

interface ChatsDialogHeaderProps {
  avatar: Avatar;
  title: string;
  usersCount?: number;
  customUsersButton?: Button;
  customUsersMenu?: MenuWindow;
}

export default class ChatsDialogHeader extends Block {
  constructor({ avatar, title, usersCount }: ChatsDialogHeaderProps) {
    const props: ChatsDialogHeaderProps = {
      avatar,
      title,
      usersCount,
      customUsersButton: new Button({
        className: 'button_round chats-dialog-header__custom-button',
        icon: 'assets/icons/Kebab-menu.svg',
        onClick: () => this._toggleCustomUsers()
      }),
      customUsersMenu: new MenuWindow({
        className: 'chats-dialog-header__user-settings',
        menuItems: [
          new MenuItem({
            icon: 'assets/icons/Add.svg',
            title: 'Добавить пользователя',
            events: {
              click: () => {
                store.set('isSearchingUsers', true);
                EventHandlers.setModalWindowActive('.modal-window_add-user');
              }
            }
          }),
          new MenuItem({
            icon: 'assets/icons/Delete.svg',
            title: 'Удалить пользователя',
            events: {
              click: () => {
                store.set('isSearchingUsers', false);
                EventHandlers.setModalWindowActive('.modal-window_delete-user');
              }
            }
          }),
          new MenuItem({
            icon: 'assets/icons/Trash.svg',
            title: 'Удалить чат',
            events: {
              click: () => {
                chatsController.deleteCurrentChat();
              }
            }
          })
        ]
      })
    };
    super(props);
  }

  private _toggleCustomUsers() {
    (this.children.customUsersMenu as MenuWindow).toggleMenu();
  }

  render() {
    return chatsDialogHeaderTemplate;
  }
}
