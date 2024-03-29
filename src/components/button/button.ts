import './button.sass';
import button from './button.hbs?raw';
import Block from '../../utils/Block';
import './button.sass';
import { EventHandlers } from '../../utils/EventHandlers.ts';

interface ButtonProps {
  text: string;
  className?: string;
  page?: string;
  events?: {};
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        mouseup: (event: Event) => EventHandlers.onClickRoute(event)
      }
    });
  }

  render() {
    return button;
  }
}
