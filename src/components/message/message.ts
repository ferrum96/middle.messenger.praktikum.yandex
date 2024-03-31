import './message.sass';
import message from './message.hbs?raw';
import Block from '../../utils/Block';

interface MessageProps {
  className?: string;
  content: string;
  time: string;
}

export default class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super({
      ...props
    });
  }

  render() {
    return message;
  }
}
