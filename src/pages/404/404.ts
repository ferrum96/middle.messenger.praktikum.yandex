import ErrorPage from '../../components/error-page/error-page.ts';

class NotFoundPage extends ErrorPage {
  constructor() {
    super({
      title: '404',
      subtitle: 'Не туда попали'
    });
  }
}

export const notFoundPage: NotFoundPage = new NotFoundPage();
