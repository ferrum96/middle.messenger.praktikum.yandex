import './menu-item.sass';
import menuItem from './menu-item.hbs?raw';
import Block from '../../utils/Block';

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
    return menuItem;
  }
}
