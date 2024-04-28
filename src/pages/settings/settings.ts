import './settings.sass';
import settingsTemplate from './settings.hbs?raw';
import {
  profileComponent,
  ProfileComponent
} from '../../components/profile-component/profile-component.ts';
import { profileForm } from '../../components/profile-form/profile-form.ts';
import Avatar from '../../components/avatar/avatar.ts';
import Block from '../../utils/Block.ts';
import authController from '../../controllers/auth-controller.ts';
import Link from '../../components/link/link.ts';
import Input from '../../components/input/input.ts';
import InputField from '../../components/input-field/input-field.ts';

interface SettingsPageProps {
  profileComponent: ProfileComponent;
}

class SettingsPage extends Block {
  constructor(props: SettingsPageProps) {
    super(props);
  }

  protected render(): string {
    return settingsTemplate;
  }
}

const props: SettingsPageProps = {
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
          title: 'Почта',
          input: new Input({
            name: 'email',
            readonly: true,
            type: 'text',
            placeholder: 'Введите почту'
          })
        }),
        new InputField({
          className: 'profile-form__input-field',
          title: 'Логин',
          input: new Input({
            name: 'login',
            readonly: true,
            type: 'text',
            placeholder: 'Введите логин'
          })
        }),
        new InputField({
          className: 'profile-form__input-field',
          title: 'Имя',
          input: new Input({
            name: 'first_name',
            readonly: true,
            type: 'text',
            placeholder: 'Введите имя'
          })
        }),
        new InputField({
          className: 'profile-form__input-field',
          title: 'Фамилия',
          input: new Input({
            name: 'second_name',
            readonly: true,
            type: 'text',
            placeholder: 'Введите фамилию'
          })
        }),
        new InputField({
          className: 'profile-form__input-field',
          title: 'Имя в чате',
          input: new Input({
            name: 'display_name',
            readonly: true,
            type: 'text',
            placeholder: 'Введите никнейм'
          })
        }),
        new InputField({
          className: 'profile-form__input-field',
          title: 'Телефон',
          input: new Input({
            name: 'phone',
            readonly: true,
            type: 'text',
            placeholder: 'Введите телефон'
          })
        })
      ],
      controlPanel: [
        new Link({
          text: 'Изменить данные',
          page: '/edit-profile'
        }),
        new Link({
          text: 'Изменить пароль',
          page: '/edit-password'
        }),
        new Link({
          text: 'Выйти',
          page: '/',
          onClick: () => {
            authController.logout();
          }
        })
      ]
    })
  })
};

export const settingsPage: SettingsPage = new SettingsPage(props);
