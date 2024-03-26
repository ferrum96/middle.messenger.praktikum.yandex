import './profile.sass';
import ProfileForm from '../../components/profile-form/profile-form';
import Avatar from '../../components/avatar/avatar';
import EditTextField from '../../components/edit-text-field/edit-text-field';
import Input from '../../components/input/input';
import Link from '../../components/link/link';
import ProfileComponent from '../../components/profile-component/profile-component';

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
      readonly: true,
      type: 'text',
      placeholder: 'Введите почту',
      value: 'ivanivanov@yandex.ru'
    })
  },
  loginEditTextFieldProps = {
    className: 'profile-form__edit-text-field',
    title: 'Логин',
    input: new Input({
      className: 'edit-text-field__element',
      name: 'login',
      readonly: true,
      type: 'text',
      placeholder: 'Введите логин',
      value: 'ivanivanov'
    })
  },
  firstNameEditTextFieldProps = {
    className: 'profile-form__edit-text-field',
    title: 'Имя',
    input: new Input({
      className: 'edit-text-field__element',
      name: 'first_name',
      readonly: true,
      type: 'text',
      placeholder: 'Введите имя',
      value: 'Иван'
    })
  },
  secondNameEditTextFieldProps = {
    className: 'profile-form__edit-text-field',
    title: 'Фамилия',
    input: new Input({
      className: 'edit-text-field__element',
      name: 'second_name',
      readonly: true,
      type: 'text',
      placeholder: 'Введите фамилию',
      value: 'Иванов'
    })
  },
  displayNameEditTextFieldProps = {
    className: 'profile-form__edit-text-field',
    title: 'Имя в чате',
    input: new Input({
      className: 'edit-text-field__element',
      name: 'display_name',
      readonly: true,
      type: 'text',
      placeholder: 'Введите никнейм',
      value: '@Ivan_Ivanov'
    })
  },
  phoneEditTextFieldProps = {
    className: 'profile-form__edit-text-field',
    title: 'Телефон',
    input: new Input({
      className: 'edit-text-field__element',
      name: 'phone',
      readonly: true,
      type: 'text',
      placeholder: 'Введите телефон',
      value: '+7-(905)-87-90'
    })
  },
  editProfileLinkProps = {
    text: 'Изменить данные',
    page: '/edit-profile'
  },
  editPasswordLinkProps = {
    text: 'Изменить пароль',
    page: '/edit-password'
  },
  logoutLinkProps = {
    text: 'Выйти',
    page: '/login'
  };

export default class ProfilePage extends ProfileComponent {
  constructor() {
    super({
      profileForm: new ProfileForm({
        avatar: new Avatar(avatarProps),
        userName: 'Иван',
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
        editProfileLink: new Link(editProfileLinkProps),
        editPasswordLink: new Link(editPasswordLinkProps),
        logoutLink: new Link(logoutLinkProps)
      })
    });
  }
}
