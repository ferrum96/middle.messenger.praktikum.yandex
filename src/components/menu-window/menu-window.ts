import Block from '../../core/block/Block.ts';
import MenuItem from '../menu-item/menu-item.ts';

interface MenuWindowProps {
  className?: string;
  menuItems: MenuItem[];
}

// language=hbs
const menuWindowTemplate = `
    <div class="menu-window menu-window_hide{{#if className}} {{ className }}{{/if}}">
        {{{menuItems}}}
    </div>
`;

export default class MenuWindow extends Block {
  constructor(props: MenuWindowProps) {
    super({
      ...props
    });
  }

  public toggleMenu() {
    this.getContent().classList.toggle('menu-window_hide');
  }

  render() {
    return menuWindowTemplate;
  }
}
