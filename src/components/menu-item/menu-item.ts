import './menu-item.sass';
import menuItemTemplate from './menu-item.hbs?raw';
import Block from '../../core/Block.ts';

interface MenuItemProps {
  icon: string;
  title: string;
  events?: {};
}

export default class MenuItem extends Block {
  constructor(props: MenuItemProps) {
    super({
      ...props
    });
  }

  render() {
    return menuItemTemplate;
  }
}
