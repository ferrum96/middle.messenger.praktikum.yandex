import Block from '../../core/block/Block.ts';

interface AvatarProps {
  className?: string;
  src: string;
  alt: string;
  events?: {};
}

// language=hbs
const avatarTemplate = `
    <figure class="avatar{{#if className}} {{className}} {{/if}}">
        {{#if src}} <img src={{{src}}} alt={{{alt}}}>{{/if}}
    </figure>
`;

let a = '';
console.log(a);

export default class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({
      ...props
    });
  }

  render() {
    return avatarTemplate;
  }
}
