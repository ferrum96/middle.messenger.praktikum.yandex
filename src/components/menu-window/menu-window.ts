import './menu-window.sass';
import menuWindow from './menu-window.hbs?raw';
import Block from '../../utils/Block';
import MenuItem from '../menu-item/menu-item';

interface MenuWindowProps {
  menuItems: MenuItem[];
}

export default class MenuWindow extends Block<MenuWindowProps> {
  constructor(props: MenuWindowProps) {
    super({
      ...props
    });
  }

  render() {
    return menuWindow;
  }
}
