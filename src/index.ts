import './index.sass';
import { loginPage } from './pages/login/login.ts';
import { signUpPage } from './pages/sign-up/sign-up.ts';
import { messengerPage } from './pages/messenger/messenger.ts';
import { settingsPage } from './pages/settings/settings.ts';
import { editProfilePage } from './pages/edit-profile/edit-profile.ts';
import { editPasswordPage } from './pages/edit-password/edit-password.ts';
import { internalServerErrorPage } from './pages/500/500.ts';
import router, { Routes } from './utils/Router.ts';
import { initApp } from './utils/initApp.ts';

router
  .use(Routes.AUTH, loginPage)
  .use(Routes.SIGNUP, signUpPage)
  .use(Routes.MESSENGER, messengerPage)
  .use(Routes.SETTINGS, settingsPage)
  .use(Routes.EDIT_PROFILE, editProfilePage)
  .use(Routes.EDIT_PASSWORD, editPasswordPage)
  .use(Routes.INTERNAL_SERVER_ERROR, internalServerErrorPage);

document.addEventListener('DOMContentLoaded', () => initApp());
