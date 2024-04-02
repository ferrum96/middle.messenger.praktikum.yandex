import './index.sass';
import { renderDOM } from './utils/renderDOM';
import Block from './utils/Block';
import SignUpPage from './pages/sign-up/sign-up';
import LoginPage from './pages/login/login';
import NotFoundPage from './pages/404/404';
import InternalServerErrorPage from './pages/500/500';
import Profile from './pages/profile/profile';
import ChatsPage from './pages/chats/chats';
import EditProfilePage from './pages/edit-profile/edit-profile';
import EditPasswordPage from './pages/edit-password/edit-password';

const pages: Record<string, Block> = {
  '/sign-up': new SignUpPage(),
  '/login': new LoginPage(),
  '/chats': new ChatsPage(),
  '/profile': new Profile(),
  '/edit-profile': new EditProfilePage(),
  '/edit-password': new EditPasswordPage(),
  '/404': new NotFoundPage(),
  '/500': new InternalServerErrorPage()
};

function navigate(page: string): void {
  const currentPage: Block = pages[page];
  renderDOM('#app', currentPage);
}

function loadPage(path: string): void {
  if (path === '/' || path === '') {
    window.location.pathname = '/login';
  }
  const page = pages[path];
  if (page) {
    navigate(path);
  } else {
    navigate('/404');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadPage(window.location.pathname);
});
