import Block from '../../utils/Block';
import button from './button.hbs?raw';
import './button.sass';
import './button.sass';
import { EventHandlers } from '../../utils/EventHandlers.ts';
import MenuWindow from '../menu-window/menu-window.ts';

interface ButtonProps {
  className?: string;
  text?: string;
  page?: string;
  icon?: string;
  menu?: MenuWindow;
  events?: {};
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        mouseup: (event: Event) => {
          this.setProps({
            menu: props.menu
          });
          this.toggleMenu();
          if (this.props.page !== undefined) {
            EventHandlers.onClickRoute(event);
          }
        }
      }
    });
  }

  private toggleMenu() {
    if (this.props.menu !== undefined) {
      this.props.menu.getContent().classList.toggle('menu-window_hide');
    }
  }

  render() {
    return button;
  }
}
