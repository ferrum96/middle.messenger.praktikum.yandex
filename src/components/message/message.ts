import './message.sass';
import message from './message.hbs?raw';
import Block from '../../utils/Block';
import Avatar from '../avatar/avatar.ts';

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
  }

  render() {
    return message;
  }
}
