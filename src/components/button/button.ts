import Block from '../../core/Block.ts';
import buttonTemplate from './button.hbs?raw';
import './button.sass';
import { EventHandlers } from '../../utils/EventHandlers.ts';

interface ButtonProps {
  className?: string;
  text?: string;
  page?: string;
  icon?: string;
  type?: string;
  events?: {};
  onClick?: () => void;
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        mouseup: (event: Event) => {
          if (props.onClick) {
            props.onClick();
          }

          if (this.props.page !== undefined) {
            EventHandlers.onClickRoute(event);
          }
        }
      }
    });
  }

  render() {
    return buttonTemplate;
  }
}
