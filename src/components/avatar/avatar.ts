import './avatar.sass';
import Block from '../../core/Block.ts';
import avatarTemplate from './avatar.hbs?raw';

interface AvatarProps {
  className?: string;
  src: string;
  alt: string;
  events?: {};
}

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
