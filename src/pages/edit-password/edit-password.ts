import './edit-password.sass';
import ProfileComponent from '../../components/profile-component/profile-component';
import ProfileForm from '../../components/profile-form/profile-form';
import Avatar from '../../components/avatar/avatar';
import Button from '../../components/button/button';
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
      title: 'Старый пароль',
      input: new Input({
        name: 'old_password',
        value: '12345678Q',
        type: 'password',
        placeholder: 'Введите старый пароль'
      }),
      error: ErrorText.PasswordErrorText
    }),
    new InputField({
      className: 'profile-form__input-field',
      title: 'Новый пароль',
      input: new Input({
        name: 'new_password',
        value: '12345678Qq',
        type: 'password',
        placeholder: 'Введите новый пароль'
      }),
      error: ErrorText.PasswordErrorText
    }),
    new InputField({
      className: 'profile-form__input-field',
      title: 'Повторите новый пароль',
      input: new Input({
        name: 'repeat_password',
        value: '12345678Qq',
        type: 'password',
        placeholder: 'Повторите новый пароль'
      }),
      error: ErrorText.RepeatPasswordErrorText
    })
  ],
  saveProfileButton = new Button({
    className: 'profile-form__save-button',
    text: 'Сохранить',
    page: '/profile'
  });

export default class EditPasswordPage extends ProfileComponent {
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
