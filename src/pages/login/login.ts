import Block from '../../utils/Block';
import './login.sass';
import loginTemplate from './login.hbs?raw';
import InputField from '../../components/input-field/input-field';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import { ErrorText } from '../../utils/ErrorText.ts';
import Form from '../../components/form/form.ts';
import Input from '../../components/input/input.ts';
import authController from '../../controllers/auth-controller.ts';
import store from '../../utils/Store.ts';
import { LoginRequestData } from '../../api/types.ts';

interface LoginPageProps {
  loginForm: Form;
}

class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super(props);
  }

  render() {
    return loginTemplate;
  }
}

const props: LoginPageProps = {
  loginForm: new Form({
    formTitle: 'Вход',
    inputFields: [
      new InputField({
        className: 'form__input-field',
        title: 'Логин',
        input: new Input({
          type: 'text',
          name: 'login',
          value: 'qaz1qaz1',
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
          value: '12345678qQ',
          placeholder: 'Введите пароль'
        }),
        error: ErrorText.PasswordErrorText
      })
    ],
    submitButton: new Button({
      text: 'Авторизация',
      type: 'submit'
    }),
    alternativeLink: new Link({
      text: 'Нет аккаунта?',
      page: '/sign-up'
    }),
    onSubmit: () => {
      authController.login(store.getState().formData as LoginRequestData);
    }
  })
};

export const loginPage: LoginPage = new LoginPage(props);
