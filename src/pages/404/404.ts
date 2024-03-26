import './404.sass';
import ErrorPage from '../../components/error-page/error-page';

export default class NotFoundPage extends ErrorPage {
  constructor() {
    super({
      title: '404',
      subtitle: 'Не туда попали'
    });
  }
}
