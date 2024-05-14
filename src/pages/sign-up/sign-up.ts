import Block from '../../core/block/Block.ts';
import InputField from '../../components/input-field/input-field.ts';
import Button from '../../components/button/button.ts';
import Link from '../../components/link/link.ts';
import { ErrorText } from '../../utils/ErrorText.ts';
import Form from '../../components/form/form.ts';
import Input from '../../components/input/input.ts';
import authController from '../../controllers/auth-controller.ts';
import store from '../../core/store/Store.ts';
import { CreateUser } from '../../api/types.ts';

interface SignUpPageProps {
  signUpForm: Form;
}

// language=hbs
const signUpTemplate = `
    <div class="center-container">
        {{{signUpForm}}}
    </div>
`;

class SignUpPage extends Block {
  constructor(props: SignUpPageProps) {
    super(props);
  }

  render() {
    return signUpTemplate;
  }
}

const props: SignUpPageProps = {
  signUpForm: new Form({
    formTitle: 'Регистрация',
    inputFields: [
      new InputField({
        className: 'form__input-field',
        title: 'Почта',
        input: new Input({
          type: 'text',
          name: 'email',
          value: 'qaz1@qaz.qaz',
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
          value: 'qaz1',
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
          value: 'Qaza',
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
          value: 'Qaza',
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
          value: '12345678qQQ',
          placeholder: 'Введите пароль'
        }),
        error: ErrorText.PasswordErrorText
      }),
      new InputField({
        className: 'form__input-field',
        title: 'Пароль (ещё раз)',
        input: new Input({
          type: 'password',
          name: 'repeatPassword',
          value: '12345678qQQ',
          placeholder: 'Повторите пароль'
        }),
        error: ErrorText.RepeatPasswordErrorText
      })
    ],
    submitButton: new Button({
      text: 'Зарегистрироваться',
      type: 'submit'
    }),
    alternativeLink: new Link({
      text: 'Войти',
      page: '/'
    }),
    onSubmit: () => {
      authController.createUser(store.getState().formData as CreateUser);
    }
  })
};

export const signUpPage: SignUpPage = new SignUpPage(props);
