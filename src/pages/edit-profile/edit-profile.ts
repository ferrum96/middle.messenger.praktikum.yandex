import './edit-profile.sass';
import editProfileTemplate from './edit-profile.hbs?raw';
import Avatar from '../../components/avatar/avatar';
import Button from '../../components/button/button';
import { ErrorText } from '../../utils/ErrorText.ts';
import InputField from '../../components/input-field/input-field.ts';
import Input from '../../components/input/input.ts';
import usersController from '../../controllers/users-controller.ts';
import store from '../../utils/Store.ts';
import { ChangeUser } from '../../api/types.ts';
import { profileForm } from '../../components/profile-form/profile-form.ts';
import router from '../../utils/Router.ts';
import {
  profileComponent,
  ProfileComponent
} from '../../components/profile-component/profile-component.ts';
import Block from '../../utils/Block.ts';

interface EditProfilePageProps {
  profileComponent: ProfileComponent;
}

class EditProfilePage extends Block {
  constructor(props: EditProfilePageProps) {
    super(props);
  }

  render(): string {
    return editProfileTemplate;
  }
}

const props: EditProfilePageProps = {
  profileComponent: new profileComponent({
    profileForm: new profileForm({
      avatar: new Avatar({
        className: 'profile-form__avatar avatar_size-big',
        src: '/icons/Default-avatar.svg',
        alt: 'default-avatar'
      }),
      inputFields: [
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
      controlPanel: [
        new Button({
          className: 'profile-form__save-button',
          text: 'Сохранить',
          type: 'submit'
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
        usersController.changeData(store.getState().formData as ChangeUser);
      }
    })
  })
};

export const editProfilePage: EditProfilePage = new EditProfilePage(props);
