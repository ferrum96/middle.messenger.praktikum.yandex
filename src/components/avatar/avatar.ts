import './avatar.sass';
import Block from '../../utils/Block';
import avatar from './avatar.hbs?raw';

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
    return avatar;
  }
}
