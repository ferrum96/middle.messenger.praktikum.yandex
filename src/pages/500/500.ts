import './500.sass';
import ErrorPage from '../../components/error-page/error-page';

class InternalServerErrorPage extends ErrorPage {
  constructor() {
    super({
      title: '500',
      subtitle: 'Мы уже фиксим'
    });
  }
}

export const internalServerErrorPage: InternalServerErrorPage =
  new InternalServerErrorPage();
