import './error-page.sass';
import errorPage from './error-page.hbs?raw';
import Block from '../../utils/Block';
import Link from '../link/link';

interface ErrorPageProps {
  className?: string;
  title: string;
  subtitle: string;
  chatLink?: Link;
}

export default abstract class ErrorPage extends Block<ErrorPageProps> {
  protected constructor(props: ErrorPageProps) {
    super({
      ...props,
      chatLink: new Link({
        text: 'Назад к чатам',
        page: '/chats'
      })
    });
  }

  render() {
    return errorPage;
  }
}
