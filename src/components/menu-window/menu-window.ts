import './menu-window.sass';
import menuWindowTemplate from './menu-window.hbs?raw';
import Block from '../../core/Block.ts';
import MenuItem from '../menu-item/menu-item';

interface MenuWindowProps {
  className?: string;
  menuItems: MenuItem[];
}

export default class MenuWindow extends Block {
  constructor(props: MenuWindowProps) {
    super({
      ...props
    });
  }

  public toggleMenu() {
    console.log(this);
    this.getContent().classList.toggle('menu-window_hide');
  }

  render() {
    return menuWindowTemplate;
  }
}
