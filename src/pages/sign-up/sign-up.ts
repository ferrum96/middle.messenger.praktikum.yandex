import './sign-up.sass';
import signUp from './sign-up.hbs?raw';
import Block from '../../utils/Block';
import InputField from '../../components/input-field/input-field';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import { ErrorText } from '../../utils/ErrorText.ts';
import Form from '../../components/form/form.ts';
import Input from '../../components/input/input.ts';

interface SignUpPageProps {
  signUpForm: Form;
}

const formTitle = 'Регистрация',
  inputFields = [
    new InputField({
      className: 'form__input-field',
      title: 'Почта',
      input: new Input({
        type: 'text',
        name: 'email',
        value: 'pochta@yandex.ru',
        placeholder: 'Введите почту'
      }),
      error: ErrorText.EmailErrorText
    }),
    new InputField({
      className: 'form__input-field',
      title: 'Логин',
      input: new Input({
        type: 'text',
        name: 'login',
        value: 'ivanivanov',
        placeholder: 'Введите логин'
      }),
      error: ErrorText.LoginErrorText
    }),
    new InputField({
      className: 'form__input-field',
      title: 'Имя',
      input: new Input({
        type: 'text',
        name: 'first_name',
        value: 'Иван',
        placeholder: 'Введите имя'
      }),
      error: ErrorText.NameErrorText
    }),
    new InputField({
      className: 'form__input-field',
      title: 'Фамилия',
      input: new Input({
        type: 'text',
        name: 'second_name',
        value: 'Иванов',
        placeholder: 'Введите фамилию'
      }),
      error: ErrorText.NameErrorText
    }),
    new InputField({
      className: 'form__input-field',
      title: 'Телефон',
      input: new Input({
        type: 'text',
        name: 'phone',
        value: '+71234567890',
        placeholder: '+71234567890'
      }),
      error: ErrorText.PhoneErrorText
    }),
    new InputField({
      className: 'form__input-field',
      title: 'Пароль',
      input: new Input({
        type: 'password',
        name: 'password',
        value: '1234567890',
        placeholder: 'Введите пароль'
      }),
      error: ErrorText.PasswordErrorText
    }),
    new InputField({
      className: 'form__input-field',
      title: 'Пароль (ещё раз)',
      input: new Input({
        type: 'password',
        name: 'repeat_password',
        value: '1234567890',
        placeholder: 'Повторите пароль'
      }),
      error: ErrorText.RepeatPasswordErrorText
    })
  ],
  submitButton = new Button({
    text: 'Зарегистрироваться',
    page: '/login'
  }),
  alternativeLink = new Link({
    text: 'Войти',
    page: '/chats'
  });

export default class SignUpPage extends Block<SignUpPageProps> {
  constructor() {
    super({
      signUpForm: new Form({
        formTitle,
        inputFields,
        submitButton,
        alternativeLink
      })
    });
  }

  render() {
    return signUp;
  }
}
