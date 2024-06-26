import chatsDialogTemplate from './chats-dialog.hbs?raw';
import './chats-dialog.sass';
import Block, { Props } from '../../core/Block.ts';
import Avatar from '../avatar/avatar.ts';
import Message from '../message/message.ts';
import { hoc } from '../../core/hoc.ts';
import { buildPathToResource } from '../../utils/buildPathToResource.ts';
import ChatsDialogHeader from '../chats-dialog-header/chats-dialog-header.ts';
import ChatsDialogFooter from '../chats-dialog-footer/chats-dialog-footer.ts';
import store from '../../core/Store.ts';
import ModalWindow from '../modal-window/modal-window.ts';
import InputField from '../input-field/input-field.ts';
import Input from '../input/input.ts';
import Button from '../button/button.ts';
import { usersList } from '../users-list/users-list.ts';
import chatsController from '../../controllers/chats-controller.ts';
import { UserDTCO } from '../../utils/types.ts';
import getTimeFromDate from '../../utils/getTimeFromDate.ts';
import usersController from '../../controllers/users-controller.ts';

interface ChatsDialogProps {
  chatsDialogHeader?: ChatsDialogHeader;
  chatMessages?: Message[];
  chatsDialogFooter?: ChatsDialogFooter;
  addUserModalWindow?: ModalWindow;
  deleteUserModalWindow?: ModalWindow;
}

export default class ChatsDialog extends Block {
  constructor() {
    const props: ChatsDialogProps = {
      deleteUserModalWindow: new ModalWindow({
        className: 'modal-window_delete-user',
        title: 'Удалить пользователя',
        content: [new usersList()],
        actionButton: new Button({
          text: 'Удалить',
          onClick: () => {
            const { currentChat, currentUser } = store.getState();

            if (currentUser !== null && currentChat !== null) {
              chatsController.deleteUserFromChat(
                currentChat?.id,
                currentUser?.id
              );
            }
          }
        })
      })
    };
    super(props);
  }

  componentDidMount() {
    this.children.addUserModalWindow = new ModalWindow({
      className: 'modal-window_add-user',
      title: 'Добавить пользователя',
      content: [
        new InputField({
          className: 'form__input-field',
          title: 'Логин',
          input: new Input({
            name: 'add_user',
            type: 'text',
            placeholder: 'Введите логин',
            onInput: (event?: Event) => {
              const target = event?.target as HTMLInputElement;
              store.set('searchingLogin', target.value);
            }
          })
        }),
        new usersList()
      ],
      actionButton: new Button({
        text: 'Добавить',
        onClick: () => {
          const { currentChat, currentUser } = store.getState();

          if (currentUser !== null && currentChat !== null) {
            chatsController.addUserToChat(currentChat?.id, currentUser?.id);
          }
        }
      })
    });

    super.componentDidMount();
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    const { currentChat, currentChatUsers, currentChatMessages } =
      store.getState();

    if (currentChat !== null) {
      this.children.chatsDialogHeader = new ChatsDialogHeader({
        avatar: new Avatar({
          className: 'avatar_size-medium',
          src: currentChat.avatar
            ? buildPathToResource(currentChat.avatar)
            : 'assets/icons/Default-avatar.svg',
          alt: currentChat.avatar ? `${currentChat.id}` : 'default-avatar'
        }),
        title: currentChat.title,
        usersCount: currentChatUsers ? currentChatUsers.length : 0
      });

      this.children.chatMessages = currentChatMessages.map(message => {
        const { user_id, content, time } = message;
        const user: UserDTCO | undefined = usersController.getUserById(user_id);

        return new Message({
          className: usersController.itMe(user_id)
            ? 'message_to'
            : 'message_from',
          name: user ? `${user.first_name} ${user.second_name}` : '',
          avatar: new Avatar({
            className: 'message__avatar avatar_size-small',
            src:
              user && user.avatar
                ? buildPathToResource(user.avatar)
                : 'assets/icons/Default-avatar.svg',
            alt: user && user.avatar ? `${user_id}` : 'default-avatar'
          }),
          content,
          time: getTimeFromDate(time)
        });
      });

      this.children.chatsDialogFooter = new ChatsDialogFooter();
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return chatsDialogTemplate;
  }
}

export const chatsDialog = hoc(state => ({
  currentChat: state.currentChat,
  currentChatUsers: state.currentChatUsers,
  isSearchingUsers: state.isSearchingUsers,
  currentChatMessages: state.currentChatMessages
}))(ChatsDialog);
