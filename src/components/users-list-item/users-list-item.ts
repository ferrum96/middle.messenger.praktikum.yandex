import './users-list-item.sass';
import usersListItemTemplate from './users-list-item.hbs?raw';
import Block from '../../utils/Block';
import Avatar from '../avatar/avatar';
import { EventHandlers } from '../../utils/EventHandlers.ts';
import usersController from '../../controllers/users-controller.ts';

interface UsersListItemProps {
  id: number;
  login: string;
  avatar: Avatar;
}

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
