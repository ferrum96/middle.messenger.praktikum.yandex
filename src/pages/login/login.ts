import Block from '../../utils/Block';
import './login.sass';
import login from './login.hbs?raw';
import InputField from '../../components/input-field/input-field';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import Input from '../../components/input/input';
import { ErrorText } from '../../utils/ErrorText.ts';
import Form from '../../components/form/form.ts';

interface LoginPageProps {
  loginForm: Form;
}

const inputFieldsProps = [
    new InputField({
      className: 'form__input',
      title: 'Логин',
      input: new Input({
        type: 'text',
        name: 'login',
        placeholder: 'Введите логин'
      }),
      error: ErrorText.LoginErrorText
    }),
    new InputField({
      className: 'form__input',
      title: 'Пароль',
      input: new Input({
        type: 'password',
        name: 'password',
        placeholder: 'Введите пароль'
      }),
      error: ErrorText.PasswordErrorText
    })
  ],
  authButtonProps = {
    text: 'Авторизация',
    page: '/chats'
  },
  registerLinkProps = {
    text: 'Нет аккаунта?',
    page: '/sign-up'
  };

export default class LoginPage extends Block<LoginPageProps> {
  constructor() {
    super({
      loginForm: new Form({
        formTitle: 'Вход',
        inputFields: inputFieldsProps,
        submitButton: new Button(authButtonProps),
        alternativeLink: new Link(registerLinkProps)
      })
    });
  }

  render() {
    return login;
  }
}
