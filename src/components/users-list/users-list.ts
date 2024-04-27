import './users-list.sass';
import chatListTemplate from './users-list.hbs?raw';
import Block, { Props } from '../../utils/Block';
import { hoc } from '../../utils/hoc.ts';
import { ChatUser, User } from '../../utils/types.ts';
import UsersListItem from '../users-list-item/users-list-item.ts';
import Avatar from '../avatar/avatar.ts';
import { buildPathToResource } from '../../utils/buildPathToResource.ts';
import usersController from '../../controllers/users-controller.ts';
import store from '../../utils/Store.ts';

interface UsersListProps {
  usersListItems?: UsersListItem[];
}

export default class UsersList extends Block {
  constructor() {
    const props: UsersListProps = {
      usersListItems: []
    };

    super(props);
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    const searchingLogin: string | null = store.getState().searchingLogin;
    const searchingUsers: User[] | null = store.getState().searchingUsers;
    const currentChatUsers: ChatUser[] | null =
      store.getState().currentChatUsers;
    const isSearchingUsers = store.getState().isSearchingUsers;

    const currentChatUsersList: UsersListItem[] = (currentChatUsers || []).map(
      user => {
        const { id, login, avatar } = user;
        return new UsersListItem({
          id,
          login,
          avatar: new Avatar({
            className: 'avatar_size-medium',
            src: avatar
              ? buildPathToResource(avatar)
              : '/icons/Default-avatar.svg',
            alt: avatar ? `${id}` : 'default-avatar'
          })
        });
      }
    ) as UsersListItem[];

    const searchingUsersList: UsersListItem[] =
      searchingLogin !== '' && searchingLogin !== null
        ? (searchingUsers || []).map(user => {
            const { id, login, avatar } = user;
            return new UsersListItem({
              id,
              login,
              avatar: new Avatar({
                className: 'avatar_size-medium',
                src: avatar
                  ? buildPathToResource(avatar)
                  : '/icons/Default-avatar.svg',
                alt: avatar ? `${id}` : 'default-avatar'
              })
            });
          })
        : ([] as UsersListItem[]);

    if (searchingLogin !== '' && searchingLogin !== null) {
      usersController.searchUsers(searchingLogin);
    }

    this.children.usersListItems = isSearchingUsers
      ? searchingUsersList
      : currentChatUsersList;

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return chatListTemplate;
  }
}

export const usersList = hoc(state => ({
  searchingUsers: state.searchingUsers,
  searchingLogin: state.searchingLogin,
  currentChatUsers: state.currentChatUsers,
  isSearchingUsers: state.isSearchingUsers
}))(UsersList);
