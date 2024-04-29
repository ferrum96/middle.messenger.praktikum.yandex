import Block from '../../core/Block.ts';
import './login.sass';
import loginTemplate from './login.hbs?raw';
import InputField from '../../components/input-field/input-field.ts';
import Form from '../../components/form/form.ts';
import Button from '../../components/button/button.ts';
import Link from '../../components/link/link.ts';
import { ErrorText } from '../../utils/ErrorText.ts';
import Input from '../../components/input/input.ts';
import authController from '../../controllers/auth-controller.ts';
import store from '../../core/Store.ts';
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
    submitButton: new Button({
      text: 'Авторизация',
      type: 'submit'
    }),
    alternativeLink: new Link({
      text: 'Нет аккаунта?',
      page: '/sign-up'
    }),
    onSubmit: (event?: Event) => {
      event?.preventDefault();
      authController.login(store.getState().formData as LoginRequestData);
    }
  })
};

export const loginPage: LoginPage = new LoginPage(props);
