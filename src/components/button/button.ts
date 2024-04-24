import './button.sass';
import button from './button.hbs?raw';
import Block from '../../utils/Block';
import './button.sass';
import { EventHandlers } from '../../utils/EventHandlers.ts';
import MenuWindow from '../menu-window/menu-window.ts';

interface ButtonProps {
  className?: string;
  text?: string;
  page?: string;
  icon?: string;
  menu?: MenuWindow;
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
          this.setProps({
            menu: props.menu
          });
          this._toggleMenu();
          if (this.props.page !== undefined) {
            EventHandlers.onClickRoute(event);
          }
        }
      }
    });
  }

  private _toggleMenu() {
    if (this.props.menu !== undefined) {
      this.props.menu.getContent().classList.toggle('menu-window_hide');
    }
  }

  render() {
    return button;
  }
}
