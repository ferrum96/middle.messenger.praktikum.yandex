import './error-page.sass';
import errorPageTemplate from './error-page.hbs?raw';
import Block from '../../core/Block.ts';
import Link from '../link/link';

interface ErrorPageProps {
  className?: string;
  title: string;
  subtitle: string;
  chatLink?: Link;
}

export default abstract class ErrorPage extends Block {
  protected constructor(props: ErrorPageProps) {
    super({
      ...props,
      chatLink: new Link({
        text: 'Назад к чатам',
        page: '/messenger'
      })
    });
  }

  render() {
    return errorPageTemplate;
  }
}
