import Block from '../../core/block/Block.ts';
import Link from '../link/link.ts';

interface ErrorPageProps {
  className?: string;
  title: string;
  subtitle: string;
  chatLink?: Link;
  events?: {};
}

// language=hbs
const errorPageTemplate = `
    <div class="center-container">
        <div class="error-page">
            <h1 class="error-page__title">{{title}}</h1>
            <h2 class="error-page__subtitle">{{subtitle}}</h2>
            {{{ chatLink }}}
        </div>
    </div>
`;

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
