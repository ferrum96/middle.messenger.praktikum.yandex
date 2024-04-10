import './link.sass';
import Block from '../../utils/Block';
import link from './link.hbs?raw';
import { EventHandlers } from '../../utils/EventHandlers.ts';

interface LinkProps {
  className?: string;
  url?: string;
  page: string;
  text: string;
  events?: {};
  onClick?: (event?: Event | undefined) => void;
}

export default class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          if (props.onClick) {
            props.onClick(event);
          }
          EventHandlers.onClickRoute(event);
        }
      }
    });
  }

  render() {
    return link;
  }
}
