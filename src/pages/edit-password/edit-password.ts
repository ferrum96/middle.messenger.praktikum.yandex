import './edit-password.sass';
import editPasswordTemplate from './edit-password.hbs?raw';
import Avatar from '../../components/avatar/avatar';
import Button from '../../components/button/button';
import { ErrorText } from '../../utils/ErrorText.ts';
import InputField from '../../components/input-field/input-field.ts';
import Input from '../../components/input/input.ts';
import usersController from '../../controllers/users-controller.ts';
import store from '../../core/Store.ts';
import { ChangePassword } from '../../api/types.ts';
import { profileForm } from '../../components/profile-form/profile-form.ts';
import router from '../../core/Router.ts';
import {
  profileComponent,
  ProfileComponent
} from '../../components/profile-component/profile-component.ts';
import Block from '../../core/Block.ts';

interface EditProfilePageProps {
  profileComponent: ProfileComponent;
}

class EditPasswordPage extends Block {
  constructor(props: EditProfilePageProps) {
    super(props);
  }

  render(): string {
    return editPasswordTemplate;
  }
}

const props: EditProfilePageProps = {
  profileComponent: new profileComponent({
    profileForm: new profileForm({
      avatar: new Avatar({
        className: 'profile-form__avatar avatar_size-big',
        src: 'assets/icons/Default-avatar.svg',
        alt: 'default-avatar'
      }),
      inputFields: [
        new InputField({
          className: 'profile-form__input-field',
          title: 'Старый пароль',
          input: new Input({
            name: 'oldPassword',
            type: 'password',
            placeholder: 'Введите старый пароль'
          }),
          error: ErrorText.PasswordErrorText
        }),
        new InputField({
          className: 'profile-form__input-field',
          title: 'Новый пароль',
          input: new Input({
            name: 'newPassword',
            type: 'password',
            placeholder: 'Введите новый пароль'
          }),
          error: ErrorText.PasswordErrorText
        }),
        new InputField({
          className: 'profile-form__input-field',
          title: 'Повторите новый пароль',
          input: new Input({
            name: 'repeatPassword',
            type: 'password',
            placeholder: 'Повторите новый пароль'
          }),
          error: ErrorText.RepeatPasswordErrorText
        })
      ],
      controlPanel: [
        new Button({
          className: 'profile-form__save-button',
          text: 'Сохранить'
        }),
        new Button({
          className: 'profile-form__save-button',
          text: 'Отменить',
          type: 'button',
          onClick: () => {
            router.back();
          }
        })
      ],
      onSubmit: () => {
        usersController.changePassword(
          store.getState().formData as ChangePassword
        );
      }
    })
  })
};

export const editPasswordPage: EditPasswordPage = new EditPasswordPage(props);
