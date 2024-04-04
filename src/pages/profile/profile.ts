import './profile.sass';
import ProfileForm from '../../components/profile-form/profile-form';
import Avatar from '../../components/avatar/avatar';
import Link from '../../components/link/link';
import ProfileComponent from '../../components/profile-component/profile-component';
import InputField from '../../components/input-field/input-field.ts';
import Input from '../../components/input/input.ts';

const avatar = new Avatar({
    className: 'profile-form__avatar',
    src: '',
    alt: ''
  }),
  userName = 'Иван',
  inputFields = [
    new InputField({
      className: 'profile-form__input-field',
      title: 'Почта',
      input: new Input({
        name: 'email',
        readonly: true,
        type: 'text',
        placeholder: 'Введите почту',
        value: 'ivanivanov@yandex.ru'
      })
    }),
    new InputField({
      className: 'profile-form__input-field',
      title: 'Логин',
      input: new Input({
        name: 'login',
        readonly: true,
        type: 'text',
        placeholder: 'Введите логин',
        value: 'ivanivanov'
      })
    }),
    new InputField({
      className: 'profile-form__input-field',
      title: 'Имя',
      input: new Input({
        name: 'first_name',
        readonly: true,
        type: 'text',
        placeholder: 'Введите имя',
        value: 'Иван'
      })
    }),
    new InputField({
      className: 'profile-form__input-field',
      title: 'Фамилия',
      input: new Input({
        name: 'second_name',
        readonly: true,
        type: 'text',
        placeholder: 'Введите фамилию',
        value: 'Иванов'
      })
    }),
    new InputField({
      className: 'profile-form__input-field',
      title: 'Имя в чате',
      input: new Input({
        name: 'display_name',
        readonly: true,
        type: 'text',
        placeholder: 'Введите никнейм',
        value: '@Ivan_Ivanov'
      })
    }),
    new InputField({
      className: 'profile-form__input-field',
      title: 'Телефон',
      input: new Input({
        name: 'phone',
        readonly: true,
        type: 'text',
        placeholder: 'Введите телефон',
        value: '+79050588790'
      })
    })
  ],
  editProfileLink = new Link({
    text: 'Изменить данные',
    page: '/edit-profile'
  }),
  editPasswordLink = new Link({
    text: 'Изменить пароль',
    page: '/edit-password'
  }),
  logoutLink = new Link({
    text: 'Выйти',
    page: '/'
  });

export default class ProfilePage extends ProfileComponent {
  constructor() {
    super({
      profileForm: new ProfileForm({
        avatar,
        userName,
        inputFields,
        editProfileLink,
        editPasswordLink,
        logoutLink
      })
    });
  }
}
