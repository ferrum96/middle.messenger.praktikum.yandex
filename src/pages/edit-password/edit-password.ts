import './edit-password.sass';
import Input from '../../components/input/input';
import ProfileComponent from '../../components/profile-component/profile-component';
import ProfileForm from '../../components/profile-form/profile-form';
import Avatar from '../../components/avatar/avatar';
import EditTextField from '../../components/edit-text-field/edit-text-field';
import Button from '../../components/button/button';
import { ErrorText } from '../../utils/validateField.ts';

const avatarProps = {
    className: 'profile-form__avatar',
    src: '',
    alt: ''
  },
  oldPasswordTextFieldProps = {
    className: 'profile-form__edit-text-field',
    title: 'Старый пароль',
    input: new Input({
      className: 'edit-text-field__element',
      name: 'oldPassword',
      type: 'password',
      placeholder: 'Введите старый пароль'
    }),
    error: ErrorText.PasswordErrorText
  },
  newPasswordEditTextFieldProps = {
    className: 'profile-form__edit-text-field',
    title: 'Новый пароль',
    input: new Input({
      className: 'edit-text-field__element',
      name: 'newPassword',
      type: 'password',
      placeholder: 'Введите новый пароль'
    }),
    error: ErrorText.PasswordErrorText
  },
  repeatNewPasswordEditTextFieldProps = {
    className: 'profile-form__edit-text-field',
    title: 'Повторите новый пароль',
    input: new Input({
      className: 'edit-text-field__element',
      name: 'repeatNewPassword',
      type: 'password',
      placeholder: 'Повторите новый пароль'
    }),
    error: ErrorText.PasswordErrorText
  },
  saveButtonProps = {
    className: 'profile-form__save-button',
    text: 'Сохранить',
    page: '/profile'
  };

export default class EditPasswordPage extends ProfileComponent {
  constructor() {
    super({
      profileForm: new ProfileForm({
        avatar: new Avatar(avatarProps),
        oldPasswordTextField: new EditTextField(oldPasswordTextFieldProps),
        newPasswordEditTextField: new EditTextField(
          newPasswordEditTextFieldProps
        ),
        repeatNewPasswordEditTextField: new EditTextField(
          repeatNewPasswordEditTextFieldProps
        ),
        saveProfileButton: new Button(saveButtonProps)
      })
    });
  }
}
