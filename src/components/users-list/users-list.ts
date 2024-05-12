import Block, { Props } from '../../core/block/Block.ts';
import { hoc } from '../../core/hoc.ts';
import UsersListItem from '../users-list-item/users-list-item.ts';
import Avatar from '../avatar/avatar.ts';
import { buildPathToResource } from '../../utils/buildPathToResource.ts';
import usersController from '../../controllers/users-controller.ts';
import store from '../../core/store/Store.ts';

interface UsersListProps {
  usersListItems?: UsersListItem[];
}

// language=hbs
const usersListTemplate = `
    <div class="users-list">
        {{{usersListItems}}}
    </div>
`;

export default class UsersList extends Block {
  constructor() {
    const props: UsersListProps = {
      usersListItems: []
    };

    super(props);
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    const {
      searchingLogin,
      searchingUsers,
      currentChatUsers,
      isSearchingUsers
    } = store.getState();

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
              : 'assets/icons/Default-avatar.svg',
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
                  : 'assets/icons/Default-avatar.svg',
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
    return usersListTemplate;
  }
}

export const usersList = hoc(state => ({
  searchingUsers: state.searchingUsers,
  searchingLogin: state.searchingLogin,
  currentChatUsers: state.currentChatUsers,
  isSearchingUsers: state.isSearchingUsers
}))(UsersList);
