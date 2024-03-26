import Block from '../../utils/Block';
import './login.sass';
import login from './login.hbs?raw';
import PageTitle from '../../components/page-title/page-title';
import InputField from '../../components/input-field/input-field';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import Input from '../../components/input/input';
import { ErrorText } from '../../utils/ErrorText.ts';

interface LoginPageProps {
  pageTitle: PageTitle;
  loginButton: Button;
  loginInputField: InputField;
  passwordInputField: InputField;
  registerLink: Link;
}

const pageTitleProps = {
    className: 'login__title',
    title: 'Вход'
  },
  loginInputFieldProps = {
    className: 'login__input',
    title: 'Логин',
    input: new Input({
      type: 'text',
      name: 'login',
      placeholder: 'Введите логин'
    }),
    error: ErrorText.LoginErrorText
  },
  passwordInputFieldProps = {
    className: 'login__input',
    title: 'Пароль',
    input: new Input({
      type: 'password',
      name: 'password',
      placeholder: 'Введите пароль'
    }),
    error: ErrorText.PasswordErrorText
  },
  authButtonProps = {
    text: 'Авторизация',
    page: '/chats'
  },
  registerLinkProps = {
    text: 'Нет аккаунта?',
    page: '/sign-up'
  };

const loginInputField: InputField = new InputField(loginInputFieldProps);

export default class LoginPage extends Block<LoginPageProps> {
  constructor() {
    super({
      pageTitle: new PageTitle(pageTitleProps),
      loginInputField,
      passwordInputField: new InputField(passwordInputFieldProps),
      loginButton: new Button(authButtonProps),
      registerLink: new Link(registerLinkProps)
    });
  }

  render() {
    return login;
  }
}
