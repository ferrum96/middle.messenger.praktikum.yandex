import './sign-up.sass';
import signUp from './sign-up.hbs?raw';
import Block from '../../utils/Block';
import InputField from '../../components/input-field/input-field';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import Input from '../../components/input/input';
import { ErrorText } from '../../utils/ErrorText.ts';
import Form from '../../components/form/form.ts';

interface SignUpPageProps {
  signUpForm: Form;
}

const inputFieldsProps = [
    new InputField({
      className: 'form__input',
      title: 'Почта',
      input: new Input({
        className: 'input-field__element',
        type: 'text',
        name: 'email',
        value: 'pochta@yandex.ru',
        placeholder: 'Введите почту'
      }),
      error: ErrorText.EmailErrorText
    }),
    new InputField({
      className: 'form__input',
      title: 'Логин',
      input: new Input({
        className: 'input-field__element',
        type: 'text',
        name: 'login',
        value: 'ivanivanov',
        placeholder: 'Введите логин'
      }),
      error: ErrorText.LoginErrorText
    }),
    new InputField({
      className: 'form__input',
      title: 'Имя',
      input: new Input({
        className: 'input-field__element',
        type: 'text',
        name: 'first_name',
        value: 'Иван',
        placeholder: 'Введите имя'
      }),
      error: ErrorText.NameErrorText
    }),
    new InputField({
      className: 'form__input',
      title: 'Фамилия',
      input: new Input({
        className: 'input-field__element',
        type: 'text',
        name: 'second_name',
        value: 'Иванов',
        placeholder: 'Введите фамилию'
      }),
      error: ErrorText.NameErrorText
    }),
    new InputField({
      className: 'form__input',
      title: 'Телефон',
      input: new Input({
        className: 'input-field__element',
        type: 'text',
        name: 'phone',
        value: '+7(123)-456-78-90',
        placeholder: '+7(###)-##-##'
      }),
      error: ErrorText.PhoneErrorText
    }),
    new InputField({
      className: 'form__input',
      title: 'Пароль',
      input: new Input({
        className: 'input-field__element',
        type: 'password',
        name: 'password',
        value: '1234567890',
        placeholder: 'Введите пароль'
      }),
      error: ErrorText.PasswordErrorText
    }),
    new InputField({
      className: 'form__input',
      title: 'Пароль (ещё раз)',
      input: new Input({
        className: 'input-field__element',
        type: 'password',
        name: 'repeat_password',
        value: '1234567890',
        placeholder: 'Повторите пароль'
      }),
      error: ErrorText.PasswordErrorText
    })
  ],
  registerButtonProps = {
    text: 'Зарегистрироваться',
    page: '/login'
  },
  loginLinkProps = {
    text: 'Войти',
    page: '/chats'
  };

export default class SignUpPage extends Block<SignUpPageProps> {
  constructor() {
    super({
      signUpForm: new Form({
        formTitle: 'Регистрация',
        inputFields: inputFieldsProps,
        submitButton: new Button(registerButtonProps),
        alternativeLink: new Link(loginLinkProps)
      })
    });
  }

  render() {
    return signUp;
  }
}
