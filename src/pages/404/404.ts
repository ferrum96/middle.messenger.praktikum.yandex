import './404.sass';
import ErrorPage from '../../components/error-page/error-page';

class NotFoundPage extends ErrorPage {
  constructor() {
    super({
      title: '404',
      subtitle: 'Не туда попали'
    });
  }
}

export const notFoundPage: NotFoundPage = new NotFoundPage();
