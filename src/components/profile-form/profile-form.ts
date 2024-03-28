import './profile-form.sass';
import profileForm from './profile-form.hbs?raw';
import Button from '../button/button';
import Block from '../../utils/Block';
import Avatar from '../avatar/avatar';
import Link from '../link/link';
import InputField from '../input-field/input-field.ts';

interface ProfileFormProps {
  avatar: Avatar;
  userName?: string;
  inputFields: InputField[];
  editProfileLink?: Link;
  editPasswordLink?: Link;
  logoutLink?: Link;
  saveProfileButton?: Button;
}

export default class ProfileForm extends Block<ProfileFormProps> {
  constructor(props: ProfileFormProps) {
    super({ ...props });
  }

  render() {
    return profileForm;
  }
}
