import './page-title.sass';
import Block from '../../utils/Block';
import pageTitle from './page-title.hbs?raw';

interface PageTitleProps {
  className?: string;
  title: string;
}

export default class PageTitle extends Block<PageTitleProps> {
  constructor(props: PageTitleProps) {
    super({
      ...props
    });
  }

  render() {
    return pageTitle;
  }
}
