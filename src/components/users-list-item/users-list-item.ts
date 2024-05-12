import Block from '../../core/block/Block.ts';
import Avatar from '../avatar/avatar.ts';
import { EventHandlers } from '../../utils/EventHandlers.ts';
import usersController from '../../controllers/users-controller.ts';

interface UsersListItemProps {
  id: number;
  login: string;
  avatar: Avatar;
}

// language=hbs
const usersListItemTemplate = `
    <div id="{{id}}" class="users-list-item">
        {{{avatar}}}
        <h3 class="users-list-item__login">{{login}}</h3>
    </div>
`;

export default class UsersListItem extends Block {
  constructor(props: UsersListItemProps) {
    super({
      ...props,
      events: {
        click: () => this._setCurrentUser()
      }
    });
  }

  private _setCurrentUser() {
    EventHandlers.setActiveItem(this.props.id, '.users-list-item');
    usersController.setCurrentUser(this.props.id);
  }

  render() {
    return usersListItemTemplate;
  }
}
