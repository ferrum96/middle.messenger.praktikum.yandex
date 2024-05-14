import Block from '../../core/block/Block.ts';
import Avatar from '../avatar/avatar.ts';

interface MessageProps {
  className?: string;
  name: string;
  avatar: Avatar;
  content: string;
  time: string;
}

// language=hbs
const messageTemplate = `
    <div class="message {{className}}">
        {{{avatar}}}
        <h5 class="message__sender-name">{{name}}</h5>
        <h4 class="message__content">{{content}}</h4>
        <h6 class="message__time">{{time}}</h6>
    </div>
`;

export default class Message extends Block {
  constructor(props: MessageProps) {
    super({
      ...props
    });
  }

  render() {
    return messageTemplate;
  }
}
