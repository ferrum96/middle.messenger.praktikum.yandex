import './index.sass';
import SignUpPage from './pages/sign-up/sign-up';
import LoginPage from './pages/login/login';
import InternalServerErrorPage from './pages/500/500';
import Profile from './pages/profile/profile';
import ChatsPage from './pages/chats/chats';
import EditProfilePage from './pages/edit-profile/edit-profile';
import EditPasswordPage from './pages/edit-password/edit-password';
import Router from './utils/Router.ts';

const router: Router = new Router();

router
  .use('/', new LoginPage())
  .use('/sign-up', new SignUpPage())
  .use('/chats', new ChatsPage())
  .use('/profile', new Profile())
  .use('/edit-profile', new EditProfilePage())
  .use('/edit-password', new EditPasswordPage())
  .use('/500', new InternalServerErrorPage())
  .start();
