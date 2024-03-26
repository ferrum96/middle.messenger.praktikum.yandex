import './edit-profile.sass';
import ProfileForm from '../../components/profile-form/profile-form';
import Avatar from '../../components/avatar/avatar';
import EditTextField from '../../components/edit-text-field/edit-text-field';

import Input from '../../components/input/input';
import Button from '../../components/button/button';
import ProfileComponent from '../../components/profile-component/profile-component';
import { ErrorText } from '../../utils/validateField.ts';

const avatarProps = {
    className: 'profile-form__avatar',
    src: '',
    alt: ''
  },
  emailEditTextFieldProps = {
    className: 'profile-form__edit-text-field',
    title: 'Почта',
    input: new Input({
      className: 'edit-text-field__element',
      name: 'email',
      type: 'text',
      placeholder: 'Введите почту'
    }),
    error: ErrorText.EmailErrorText
  },
  loginEditTextFieldProps = {
    className: 'profile-form__edit-text-field',
    title: 'Логин',
    input: new Input({
      className: 'edit-text-field__element',
      name: 'login',
      type: 'text',
      placeholder: 'Введите логин'
    }),
    error: ErrorText.LoginErrorText
  },
  firstNameEditTextFieldProps = {
    className: 'profile-form__edit-text-field',
    title: 'Имя',
    input: new Input({
      className: 'edit-text-field__element',
      name: 'first_name',
      type: 'text',
      placeholder: 'Введите имя'
    }),
    error: ErrorText.NameErrorText
  },
  secondNameEditTextFieldProps = {
    className: 'profile-form__edit-text-field',
    title: 'Фамилия',
    input: new Input({
      className: 'edit-text-field__element',
      name: 'second_name',
      type: 'text',
      placeholder: 'Введите фамилию'
    }),
    error: ErrorText.NameErrorText
  },
  displayNameEditTextFieldProps = {
    className: 'profile-form__edit-text-field',
    title: 'Имя в чате',
    input: new Input({
      className: 'edit-text-field__element',
      name: 'display_name',
      type: 'text',
      placeholder: 'Введите никнейм'
    }),
    error: ErrorText.LoginErrorText
  },
  phoneEditTextFieldProps = {
    className: 'profile-form__edit-text-field',
    title: 'Телефон',
    input: new Input({
      className: 'edit-text-field__element',
      name: 'phone',
      type: 'text',
      placeholder: 'Введите телефон'
    }),
    error: ErrorText.PhoneErrorText
  },
  saveButtonProps = {
    className: 'profile-form__save-button',
    text: 'Сохранить',
    page: '/profile'
  };

export default class EditProfilePage extends ProfileComponent {
  constructor() {
    super({
      profileForm: new ProfileForm({
        avatar: new Avatar(avatarProps),
        emailEditTextField: new EditTextField(emailEditTextFieldProps),
        loginEditTextField: new EditTextField(loginEditTextFieldProps),
        firstNameEditTextField: new EditTextField(firstNameEditTextFieldProps),
        secondNameEditTextField: new EditTextField(
          secondNameEditTextFieldProps
        ),
        displayNameEditTextField: new EditTextField(
          displayNameEditTextFieldProps
        ),
        phoneEditTextField: new EditTextField(phoneEditTextFieldProps),
        saveProfileButton: new Button(saveButtonProps)
      })
    });
  }
}
