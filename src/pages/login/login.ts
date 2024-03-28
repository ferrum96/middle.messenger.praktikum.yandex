import Block from '../../utils/Block';
import './login.sass';
import login from './login.hbs?raw';
import InputField from '../../components/input-field/input-field';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import { ErrorText } from '../../utils/ErrorText.ts';
import Form from '../../components/form/form.ts';
import Input from '../../components/input/input.ts';

interface LoginPageProps {
  loginForm: Form;
}

const formTitle = 'Вход',
  inputFields = [
    new InputField({
      className: 'form__input-field',
      title: 'Логин',
      input: new Input({
        type: 'text',
        name: 'login',
        placeholder: 'Введите логин'
      }),
      error: ErrorText.LoginErrorText
    }),
    new InputField({
      className: 'form__input-field',
      title: 'Пароль',
      input: new Input({
        type: 'password',
        name: 'password',
        placeholder: 'Введите пароль'
      }),
      error: ErrorText.PasswordErrorText
    })
  ],
  submitButton = new Button({
    text: 'Авторизация',
    page: '/chats'
  }),
  alternativeLink = new Link({
    text: 'Нет аккаунта?',
    page: '/sign-up'
  });

export default class LoginPage extends Block<LoginPageProps> {
  constructor() {
    super({
      loginForm: new Form({
        formTitle,
        inputFields,
        submitButton,
        alternativeLink
      })
    });
  }

  render() {
    return login;
  }
}
