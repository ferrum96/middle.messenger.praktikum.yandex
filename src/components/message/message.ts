import './message.sass';
import message from './message.hbs?raw';
import Block from '../../utils/Block';
import Avatar from '../avatar/avatar.ts';
import usersController from '../../controllers/users-controller.ts';

interface MessageProps {
  className?: string;
  name: string;
  avatar: Avatar;
  content: string;
  time: string;
}

export default class Message extends Block {
  constructor(props: MessageProps) {
    super({
      ...props
    });
    // this.props.getName = this.getName.bind(this);
    // this.props.getTime = this.getTime.bind(this);
    // this.props.getAlignment = this.getAlignment.bind(this);
    // this.props.getAvatar = this.getAvatar.bind(this);
    // this.props.isAvatar = this.isAvatar.bind(this);
  }

  getName() {
    const user = usersController.getUserById(this.props.user_id);
    if (user) {
      return user.display_name || `${user.second_name} ${user.first_name}`;
    }
    return 'unknown';
  }

  getAvatar() {
    return usersController.getAvatar(this.props.user_id);
  }

  isAvatar() {
    return this.getAlignment() === 'from';
  }

  getAlignment() {
    console.log(this.props.user_id);
    return usersController.itMe(this.props.user_id) ? 'to' : 'from';
  }

  getTime() {
    if (!this.props.time) return '';

    const chatTime = new Date(this.props.time);
    const startDay = new Date();
    startDay.setHours(0, 0, 0, 0);

    const startWeek = new Date();
    startWeek.setHours(0, 0, 0, 0);
    startWeek.setDate(0);
    let options = {};
    if (chatTime > startDay) {
      options = {
        hour: 'numeric',
        minute: 'numeric'
      };
    } else {
      options = {
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      };
    }
    return chatTime.toLocaleString('ru', options);
  }

  render() {
    return message;
  }
}
