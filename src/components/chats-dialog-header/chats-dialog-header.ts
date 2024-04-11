import chatsDialogHeaderTemplate from './chats-dialog-header.hbs?raw';
import './chats-dialog-header.sass';
import Block from '../../utils/Block.ts';
import Avatar from '../avatar/avatar.ts';
import Button from '../button/button.ts';
import MenuWindow from '../menu-window/menu-window.ts';
import MenuItem from '../menu-item/menu-item.ts';

interface ChatsDialogHeaderProps {
  avatar: Avatar;
  title: string;
  customUsersButton?: Button;
}

export default class ChatsDialogHeader extends Block {
  constructor({ avatar, title }: ChatsDialogHeaderProps) {
    const props: ChatsDialogHeaderProps = {
      avatar,
      title,
      customUsersButton: new Button({
        className: 'button_round chats-dialog-header__custom-button',
        icon: '/icons/Kebab-menu.svg',
        menu: new MenuWindow({
          className: 'chats-dialog-header__user-settings',
          menuItems: [
            new MenuItem({
              icon: 'icons/Add.svg',
              title: 'Добавить пользователя',
              events: {
                click: () => console.log('Добавить пользователя')
              }
            }),
            new MenuItem({
              icon: 'icons/Delete.svg',
              title: 'Удалить пользователя',
              events: {
                click: () => console.log('Удалить пользователя')
              }
            }),
            new MenuItem({
              icon: 'icons/Trash.svg',
              title: 'Удалить чат',
              events: {
                click: () => console.log('Удалить чат')
              }
            })
          ]
        })
      })
    };
    super(props);
  }

  render() {
    return chatsDialogHeaderTemplate;
  }
}
