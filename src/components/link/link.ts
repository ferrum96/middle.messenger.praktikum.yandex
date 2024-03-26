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
}

export default class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => EventHandlers.onClickRoute(event)
      }
    });
  }

  render() {
    return link;
  }
}
