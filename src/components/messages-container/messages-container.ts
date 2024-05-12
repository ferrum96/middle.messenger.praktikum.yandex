import Block from '../../core/block/Block.ts';
import Message from '../message/message.ts';

interface MessagesContainerProps {
  date: string;
  messagesList: Message[];
}

// language=hbs
const messagesContainerTemplate = `
    <div class="messages-container">
        <h4 class="messages-container__date">{{date}}</h4>
        {{{messagesList}}}
    </div>
`;

export default class MessagesContainer extends Block {
  constructor(props: MessagesContainerProps) {
    super({
      ...props
    });
  }

  render() {
    return messagesContainerTemplate;
  }
}
