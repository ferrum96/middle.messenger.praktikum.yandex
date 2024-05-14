import Block from '../../core/block/Block.ts';
import { EventHandlers } from '../../utils/EventHandlers.ts';

interface LinkProps {
  className?: string;
  url?: string;
  page?: string;
  text: string;
  events?: {};
  onClick?: (event?: Event) => void;
}

// language=hbs
const linkTemplate = `
    <a href="{{url}}" class="link{{#if className}} {{className}}{{/if}}" page="{{page}}">{{text}} </a>
`;

export default class Link extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          if (props.onClick) {
            props.onClick(event);
          }
          if (props.page !== undefined) {
            EventHandlers.onClickRoute(event);
          }
        }
      }
    });
  }

  render() {
    return linkTemplate;
  }
}
