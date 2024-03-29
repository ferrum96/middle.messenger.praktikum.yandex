import './profile-form.sass';
import profileForm from './profile-form.hbs?raw';
import Button from '../button/button';
import Block from '../../utils/Block';
import Avatar from '../avatar/avatar';
import Link from '../link/link';
import InputField from '../input-field/input-field.ts';
import { EventHandlers } from '../../utils/EventHandlers.ts';

interface ProfileFormProps {
  avatar: Avatar;
  userName?: string;
  inputFields: InputField[];
  editProfileLink?: Link;
  editPasswordLink?: Link;
  logoutLink?: Link;
  saveProfileButton?: Button;
  events?: {};
}

export default class ProfileForm extends Block<ProfileFormProps> {
  constructor(props: ProfileFormProps) {
    super({
      ...props,
      events: {
        submit: (event: Event) => {
          EventHandlers.validateForm(this);
          EventHandlers.sendFormData(event, this);
        }
      }
    });
  }

  render() {
    return profileForm;
  }
}
