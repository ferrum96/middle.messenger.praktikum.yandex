import Block from '../../utils/Block';
import './login.sass';
import login from './login.hbs?raw';
import InputField from '../../components/input-field/input-field';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import { ErrorText } from '../../utils/ErrorText.ts';
import Form from '../../components/form/form.ts';
import Input from '../../components/input/input.ts';
import connect from '../../utils/connect.ts';
import authController from '../../controllers/auth-controller.ts';
import { LoginRequestData } from '../../utils/types.ts';
import store from '../../utils/Store.ts';

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
        value: 'qaz',
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
  submitButton = new Button({
    text: 'Авторизация'
  }),
  alternativeLink = new Link({
    text: 'Нет аккаунта?',
    page: '/sign-up'
  });

class LoginPage extends Block<LoginPageProps> {
  constructor() {
    super({
      loginForm: new Form({
        formTitle,
        inputFields,
        submitButton,
        alternativeLink,
        onSubmit: () => {
          authController.login(store.getState().formData as LoginRequestData);
        }
      })
    });
  }

  render() {
    return login;
  }
}

export default connect(LoginPage);
