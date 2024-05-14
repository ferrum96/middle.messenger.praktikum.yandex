import Block from '../../core/block/Block.ts';

interface MenuItemProps {
  icon: string;
  title: string;
  events?: {};
}

// language=hbs
const menuItemTemplate = `
    <div class="menu-item">
        <img class="menu-item__icon" src="{{{icon}}}" alt="{{{title}}}">
        <p class="menu-item__title">{{{title}}}</p>
    </div>
`;

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
