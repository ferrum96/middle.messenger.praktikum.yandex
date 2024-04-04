import './messages-container.sass';
import messagesContainer from './messages-container.hbs?raw';
import Block from '../../utils/Block';
import Message from '../message/message.ts';

interface MessagesContainerProps {
  date: string;
  messagesList: Message[];
}

export default class MessagesContainer extends Block<MessagesContainerProps> {
  constructor(props: MessagesContainerProps) {
    super({
      ...props
    });
  }

  render() {
    return messagesContainer;
  }
}
