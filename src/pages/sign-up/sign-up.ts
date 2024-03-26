import './sign-up.sass';
import signUp from './sign-up.hbs?raw';

import Block from '../../utils/Block';
import PageTitle from '../../components/page-title/page-title';
import InputField from '../../components/input-field/input-field';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import Input from '../../components/input/input';
import { ErrorText } from '../../utils/validateField.ts';

interface SignUpProps {
  signUpTitle: PageTitle;
  emailInputField: InputField;
  loginInputField: InputField;
  firstNameInputField: InputField;
  secondNameInputField: InputField;
  phoneInputField: InputField;
  passwordInputField: InputField;
  repeatPasswordInputField: InputField;
  registerButton: Button;
  loginLink: Link;
}

const signUpTitleProps = {
    className: 'sign-up__title',
    title: 'Регистрация'
  },
  emailInputFieldProps = {
    className: 'sign-up__input',
    title: 'Почта',
    input: new Input({
      className: 'input-field__element',
      type: 'text',
      name: 'email',
      value: 'pochta@yandex.ru',
      placeholder: 'Введите почту'
    }),
    error: ErrorText.EmailErrorText
  },
  loginInputFieldProps = {
    className: 'sign-up__input',
    title: 'Логин',
    input: new Input({
      className: 'input-field__element',
      type: 'text',
      name: 'login',
      value: 'ivanivanov',
      placeholder: 'Введите логин'
    }),
    error: ErrorText.LoginErrorText
  },
  firstNameInputFieldProps = {
    className: 'sign-up__input',
    title: 'Имя',
    input: new Input({
      className: 'input-field__element',
      type: 'text',
      name: 'first_name',
      value: 'Иван',
      placeholder: 'Введите имя'
    }),
    error: ErrorText.NameErrorText
  },
  secondNameInputFieldProps = {
    className: 'sign-up__input',
    title: 'Фамилия',
    input: new Input({
      className: 'input-field__element',
      type: 'text',
      name: 'second_name',
      value: 'Иванов',
      placeholder: 'Введите фамилию'
    }),
    error: ErrorText.NameErrorText
  },
  phoneInputFieldProps = {
    className: 'sign-up__input',
    title: 'Телефон',
    input: new Input({
      className: 'input-field__element',
      type: 'text',
      name: 'phone',
      value: '+7(123)-456-78-90',
      placeholder: '+7(###)-##-##'
    }),
    error: ErrorText.PhoneErrorText
  },
  passwordInputFieldProps = {
    className: 'sign-up__input',
    title: 'Пароль',
    input: new Input({
      className: 'input-field__element',
      type: 'password',
      name: 'password',
      value: '1234567890',
      placeholder: 'Введите пароль'
    }),
    error: ErrorText.PasswordErrorText
  },
  repeatPasswordInputFieldProps = {
    className: 'sign-up__input',
    title: 'Пароль (ещё раз)',
    input: new Input({
      className: 'input-field__element',
      type: 'password',
      name: 'repeat_password',
      value: '1234567890',
      placeholder: 'Повторите пароль'
    }),
    error: ErrorText.PasswordErrorText
  },
  registerButtonProps = {
    text: 'Зарегистрироваться',
    page: '/login'
  },
  loginLinkProps = {
    text: 'Войти',
    page: '/chats'
  };

export default class SignUpPage extends Block<SignUpProps> {
  constructor() {
    super({
      signUpTitle: new PageTitle(signUpTitleProps),
      emailInputField: new InputField(emailInputFieldProps),
      loginInputField: new InputField(loginInputFieldProps),
      firstNameInputField: new InputField(firstNameInputFieldProps),
      secondNameInputField: new InputField(secondNameInputFieldProps),
      phoneInputField: new InputField(phoneInputFieldProps),
      passwordInputField: new InputField(passwordInputFieldProps),
      repeatPasswordInputField: new InputField(repeatPasswordInputFieldProps),
      registerButton: new Button(registerButtonProps),
      loginLink: new Link(loginLinkProps)
    });
  }

  render() {
    return signUp;
  }
}
