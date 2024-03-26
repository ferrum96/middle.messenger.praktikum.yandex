import './link.sass';
import Block from '../../utils/Block';
import link from './link.hbs?raw';

interface LinkProps {
  className?: string;
  url?: string;
  page: string;
  text: string;
}

export default class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props
    });
  }

  render() {
    return link;
  }
}
