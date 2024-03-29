import './edit-profile.sass';
import ProfileForm from '../../components/profile-form/profile-form';
import Avatar from '../../components/avatar/avatar';
import Button from '../../components/button/button';
import ProfileComponent from '../../components/profile-component/profile-component';
import { ErrorText } from '../../utils/ErrorText.ts';
import InputField from '../../components/input-field/input-field.ts';
import Input from '../../components/input/input.ts';

const avatar = new Avatar({
    className: 'profile-form__avatar',
    src: '',
    alt: ''
  }),
  inputFields = [
    new InputField({
      className: 'profile-form__input-field',
      title: 'Почта',
      input: new Input({
        name: 'email',
        type: 'text',
        placeholder: 'Введите почту'
      }),
      error: ErrorText.EmailErrorText
    }),
    new InputField({
      className: 'profile-form__input-field',
      title: 'Логин',
      input: new Input({
        name: 'login',
        type: 'text',
        placeholder: 'Введите логин'
      }),
      error: ErrorText.LoginErrorText
    }),
    new InputField({
      className: 'profile-form__input-field',
      title: 'Имя',
      input: new Input({
        name: 'first_name',
        type: 'text',
        placeholder: 'Введите имя'
      }),
      error: ErrorText.NameErrorText
    }),
    new InputField({
      className: 'profile-form__input-field',
      title: 'Фамилия',
      input: new Input({
        name: 'second_name',
        type: 'text',
        placeholder: 'Введите фамилию'
      }),
      error: ErrorText.NameErrorText
    }),
    new InputField({
      className: 'profile-form__input-field',
      title: 'Имя в чате',
      input: new Input({
        name: 'display_name',
        type: 'text',
        placeholder: 'Введите никнейм'
      }),
      error: ErrorText.LoginErrorText
    }),
    new InputField({
      className: 'profile-form__input-field',
      title: 'Телефон',
      input: new Input({
        name: 'phone',
        type: 'text',
        placeholder: 'Введите телефон'
      }),
      error: ErrorText.PhoneErrorText
    })
  ],
  saveProfileButton = new Button({
    className: 'profile-form__save-button',
    text: 'Сохранить',
    page: '/profile'
  });

export default class EditProfilePage extends ProfileComponent {
  constructor() {
    super({
      profileForm: new ProfileForm({
        avatar,
        inputFields,
        saveProfileButton
      })
    });
  }
}
