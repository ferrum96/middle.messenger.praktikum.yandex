import './menu-item.sass';
import menuItem from './menu-item.hbs?raw';
import Block from '../../utils/Block';

interface MenuItemProps {
  icon: string;
  title: string;
}

export default class MenuItem extends Block<MenuItemProps> {
  constructor(props: MenuItemProps) {
    super({
      ...props
    });
  }

  render() {
    return menuItem;
  }
}
